import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowDownUp, TrendingUp } from 'lucide-react';

interface ExchangeRates { [key: string]: number }
interface CurrencyMeta { code: string; name: string }

const CurrencyConverter = () => {
  const [amount, setAmount] = useState<string>('1');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [currencies, setCurrencies] = useState<CurrencyMeta[]>([]);

  useEffect(() => { fetchExchangeRates(); }, [fromCurrency]);
  useEffect(() => { calculateConversion(); }, [amount, fromCurrency, toCurrency, exchangeRates]);

  async function fetchExchangeRates() {
    setLoading(true);
    try {
      const res = await fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`);
      const data = await res.json();
      setExchangeRates(data.rates);
      setLastUpdate(new Date(data.time_last_update_utc).toLocaleDateString());
      if (currencies.length === 0 && data.rates) {
        const list: CurrencyMeta[] = Object.keys(data.rates)
          .concat([fromCurrency])
          .filter((v, i, a) => a.indexOf(v) === i)
          .sort()
          .map((code) => ({ code, name: code }));
        setCurrencies(list);
      }
    } catch {
      // noop fallback UI keeps working
    } finally {
      setLoading(false);
    }
  }

  function calculateConversion() {
    const num = parseFloat(amount);
    if (Number.isNaN(num) || !exchangeRates[toCurrency]) { setConvertedAmount(0); return; }
    setConvertedAmount(num * exchangeRates[toCurrency]);
  }

  function handleSwapCurrencies() {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value; if (v === '' || /^\d*\.?\d*$/.test(v)) setAmount(v);
  }

  function getExchangeRate() { return exchangeRates[toCurrency] ?? 0; }

  return (
    <Card className="w-full max-w-2xl shadow-[var(--shadow-elegant)] border-border/50 backdrop-blur-xl bg-card/95 animate-scale-in">
      <CardHeader className="space-y-1">
        <CardTitle className="text-3xl font-bold bg-[var(--gradient-primary)] bg-clip-text text-transparent">Currency Converter</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4" /> Real-time exchange rates • Last updated: {lastUpdate || 'Loading...'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">From</label>
          <div className="flex gap-3">
            <input type="text" value={amount} onChange={handleAmountChange} placeholder="0.00" className="flex-1 h-14 px-4 text-2xl font-semibold bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth" />
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-[200px] h-14 text-base font-medium rounded-md border bg-background px-3"
            >
              {(currencies.length ? currencies : [{ code: fromCurrency, name: fromCurrency }]).map((c) => (
                <option key={c.code} value={c.code}>{c.code} - {c.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-center">
          <Button variant="outline" size="icon" onClick={handleSwapCurrencies} className="rounded-full h-12 w-12 border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-smooth hover:scale-110" disabled={loading}>
            <ArrowDownUp className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">To</label>
          <div className="flex gap-3">
            <div className="flex-1 h-14 px-4 flex items-center text-2xl font-semibold bg-muted/50 border border-border rounded-lg">
              <span className="text-foreground">
                {Number.isFinite(convertedAmount) ? convertedAmount.toLocaleString(undefined, { maximumFractionDigits: 2 }) : '0.00'}
              </span>
            </div>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-[200px] h-14 text-base font-medium rounded-md border bg-background px-3"
            >
              {(currencies.length ? currencies : [{ code: toCurrency, name: toCurrency }]).map((c) => (
                <option key={c.code} value={c.code}>{c.code} - {c.name}</option>
              ))}
            </select>
          </div>
        </div>

        {!!exchangeRates[toCurrency] && (
          <div className="pt-4 border-t border-border">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Exchange Rate</span>
              <span className="font-semibold">1 {fromCurrency} = {getExchangeRate().toFixed(4)} {toCurrency}</span>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              = {amount || '0'} {fromCurrency} → <span className="font-semibold text-foreground">{Number.isFinite(convertedAmount) ? convertedAmount.toLocaleString(undefined, { maximumFractionDigits: 2 }) : '0.00'}</span> {toCurrency}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CurrencyConverter;


