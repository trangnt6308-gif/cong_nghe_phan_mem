import zlib
import urllib.request
import os

PUML_FILE = r"c:\bài tập\dự án học tập\dự án công nghệ phần mềm\srs\so-do\diagrams\arch_backend.puml"
OUT_FILE  = r"c:\bài tập\dự án học tập\dự án công nghệ phần mềm\srs\so-do\diagrams\arch_backend.png"
SERVER    = "https://www.plantuml.com/plantuml/png/"

_PLANTUML_CHARS = (
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_"
)

def _encode6bit(b: int) -> str:
    if b < 10:
        return chr(ord('0') + b)
    b -= 10
    if b < 26:
        return chr(ord('A') + b)
    b -= 26
    if b < 26:
        return chr(ord('a') + b)
    b -= 26
    if b == 0:
        return '-'
    if b == 1:
        return '_'
    return '?'

def _append3bytes(b1: int, b2: int, b3: int) -> str:
    c1 = b1 >> 2
    c2 = ((b1 & 0x3) << 4) | (b2 >> 4)
    c3 = ((b2 & 0xF) << 2) | (b3 >> 6)
    c4 = b3 & 0x3F
    return (_encode6bit(c1 & 0x3F) + _encode6bit(c2 & 0x3F) +
            _encode6bit(c3 & 0x3F) + _encode6bit(c4 & 0x3F))

def encode_plantuml(text: str) -> str:
    data = zlib.compress(text.encode('utf-8'), 9)
    res = ""
    i = 0
    while i < len(data):
        if i + 2 < len(data):
            res += _append3bytes(data[i], data[i+1], data[i+2])
        elif i + 1 < len(data):
            res += _append3bytes(data[i], data[i+1], 0)
        else:
            res += _append3bytes(data[i], 0, 0)
        i += 3
    return res

def download_png(puml_text: str, out_path: str):
    encoded = encode_plantuml(puml_text)
    url = SERVER + "~1" + encoded
    print(f"Fetching from {url[:80]}...")
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        data = resp.read()
    if data[:4] == b'\x89PNG':
        with open(out_path, 'wb') as f:
            f.write(data)
        print(f"Saved: {out_path}")
    else:
        print("ERROR: Response is not a valid PNG")

def main():
    if not os.path.exists(PUML_FILE):
        print(f"ERROR: {PUML_FILE} does not exist!")
        return
    with open(PUML_FILE, 'r', encoding='utf-8') as f:
        text = f.read()
    print("Exporting backend architecture diagram...")
    download_png(text, OUT_FILE)
    print("Done!")

if __name__ == '__main__':
    main()
