import json
import subprocess
import sys

command = """
curl 'https://query1.finance.yahoo.com/v8/finance/chart/<TICKER>?region=US&lang=en-US&includePrePost=false&interval=1d&useYfid=true&range=5y&corsDomain=finance.yahoo.com&.tsrc=finance' \
  -H 'authority: query1.finance.yahoo.com' \
  -H 'accept: */*' \
  -H 'accept-language: en-US,en;q=0.9,es;q=0.8' \
  -H 'origin: https://finance.yahoo.com' \
  -H 'referer: https://finance.yahoo.com/quote/<TICKER>?p=<TICKER>&.tsrc=fin-srch' \
  -H 'sec-ch-ua: "Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "macOS"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: same-site' \
  -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' \
  --compressed"""


def download_quote(ticker: str):
    try:
        print("Downloading quote.")
        # Execute the curl command using subprocess
        result = subprocess.run(
            command.replace("<TICKER>", ticker),
            shell=True,
            capture_output=True,
            text=True,
            check=True,
        )

        # Access the response and print it
        response = json.loads(result.stdout)
        print("Downloaded quote.")
        obj = {
            "name": ticker,
            "timestamp": response["chart"]["result"][0]["timestamp"],
            "low": response["chart"]["result"][0]["indicators"]["quote"][0]["low"],
            "high": response["chart"]["result"][0]["indicators"]["quote"][0]["high"],
            "open": response["chart"]["result"][0]["indicators"]["quote"][0]["open"],
            "close": response["chart"]["result"][0]["indicators"]["quote"][0]["close"],
            "volume": response["chart"]["result"][0]["indicators"]["quote"][0][
                "volume"
            ],
        }
        print(f"Obtained {len(obj['timestamp'])} data points")

        print("Saving into quotes.json file")
        current_quotes = {}
        with open("quotes.json", "r") as file:
            current_quotes = json.loads(file.read())
        current_quotes[ticker] = json.dumps(obj)

        with open("quotes.json", "w") as file:
            file.write(json.dumps(current_quotes))

        print("Saved correctly")

    except subprocess.CalledProcessError as e:
        # Handle errors if the curl command fails
        print(f"Error: {e}")


download_quote(sys.argv[1])
