import pandas as pd
import numpy as np
import argparse


def compute_snr(close_prices: pd.Series) -> float:
    """Calculate signal-to-noise ratio from a series of closing prices."""
    returns = close_prices.pct_change().dropna()
    signal = returns.mean()
    noise = returns.std()
    if noise == 0:
        return float('inf')
    return float(signal / noise)


def main():
    parser = argparse.ArgumentParser(description="Calculate signal-to-noise ratio of stock prices from a CSV file.")
    parser.add_argument("csv_file", help="CSV file with at least a 'Close' column")
    args = parser.parse_args()

    df = pd.read_csv(args.csv_file)
    if 'Close' not in df.columns:
        raise ValueError("CSV file must contain a 'Close' column")

    snr = compute_snr(df['Close'])
    print(f"Signal-to-noise ratio: {snr:.4f}")


if __name__ == "__main__":
    main()
