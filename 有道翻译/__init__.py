#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time : 18/4/2024 下午6:29
# @Author : ChenShan
import json

import requests
import execjs
import os
import subprocess

decodeKey = "ydsecret://query/key/B*RGygVywfNBwpmBaZg*WT7SIOUP2T0C9WHMZN39j^DAdaZhAnxvGcCY6VYFwnHl"

decodeIv = "ydsecret://query/iv/C@lZe2YzHtZ2CYgaXKSVfsb7Y4QWHjITPPZ0nQp87fBeJ!Iv6v^6fvi2WN@bYpJ4"

e = 'fsdsogkndfokasodnaso'

# 8个月有效期
cookies = {
    'OUTFOX_SEARCH_USER_ID': '-1@127.0.0.1'
}

headers = {
    'Referer': 'https://fanyi.youdao.com/',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 Edg/123.0.0.0',
}


def call_decrypt_js(encrypted_text):
    try:
        result = subprocess.run(
            ['node', '解密.js', encrypted_text],
            capture_output=True, text=True, encoding='utf-8', check=True
        )
        return result.stdout.strip()
    except subprocess.CalledProcessError as e:
        print("Error:", e)
        return None


# 固定数据
static_data = {
    'i': input('请输入要翻译的内容：'),
    'from': 'auto',
    'to': '',
    'domain': '0',
    'dictResult': 'true',
    'keyid': 'webfanyi'
}

# 动态数据
with open('有道sign.js', 'r', encoding='utf-8') as f:
    js = f.read()
data = execjs.compile(js).call('k', e)

# 合并
data.update(static_data)

# 请求
response = requests.post('https://dict.youdao.com/webtranslate', cookies=cookies, headers=headers, data=data)

# 获取加密数据
encrypted_data = response.text
# print("加密数据: ", encrypted_data)
if 'error' in encrypted_data:
    print("翻译失败: ", json.loads(response.text)['msg'])
    exit(1)

# 解密
decrypted_data = call_decrypt_js(encrypted_data)

# 解析
data = json.loads(decrypted_data)
# print(data)
if data['code'] == 0:
    print("翻译结果: ", data['translateResult'][0][0]['tgt'])
else:
    print("翻译失败: ", data['msg'])
