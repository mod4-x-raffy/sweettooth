import re

input = open('world.svg', 'r')
lines = input.readlines()
input.close()

output = open('lines.txt', 'w');

# only want to grab these paths
includes = [
  "US", "GB", "CA", "CN", "HR", "NL", "EG", "PH", "FR", "GR", "IN", "IE", "IT", "JM", "JP", "KE", "MY", "MX", "MA", "PL", "PT", "RU", "ES", "TH", "TN", "UA", "VN"
]
# path index
pathIdx = -1
lines = ""

idx = 1

while idx < len(lines):
  if 'path' not in lines[idx]:
    idx += 1
  else:
    pathIdx+=1
    id = re.search("[A-Z]{2}", lines[idx+3]).group()
    if id in includes:
      lines += pathIdx
    idx += 4

output.close();

