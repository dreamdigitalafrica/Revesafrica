import json,subprocess,concurrent.futures,sys

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3000"
def records(collection):
 return json.loads(subprocess.check_output(["curl", "--fail", "-sS", "--max-time", "30", f"https://revesfoundation.pockethost.io/api/collections/{collection}/records?perPage=500"], text=True))["items"]
from html.parser import HTMLParser
from urllib.parse import urljoin,urlsplit
class Parser(HTMLParser):
 def __init__(self):super().__init__();self.links=[];self.ids=set();self.assets=[]
 def handle_starttag(self,t,a):
  a=dict(a)
  if 'id' in a:self.ids.add(a['id'])
  if t=='a' and 'href' in a:self.links.append(a['href'])
  if t in ('img','script') and a.get('src'):self.assets.append(a['src'])
def get(path):
 p=subprocess.run(['curl','-sS','-L','--max-time','35','-w','\n%{http_code}',urljoin(BASE,path)],capture_output=True,text=True,errors="replace")
 body,_,status=p.stdout.rpartition('\n');h=Parser();h.feed(body);return path,status,h,body
paths=['/','/about','/projects','/programs','/blog','/team','/our-mission','/impact']
paths += ['/projects/'+x['id'] for x in records('projects')]
paths += ['/team/'+x['username'] for x in records('team')]
paths += ['/blog/'+s for s in ['dont-bully-me-campaign','the-digital-literacy-project','big-smile-project','community-outreach-empowerment','xfrple26m2zu5fd']]
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as ex: results=list(ex.map(get,paths))
errors=[];cache={p:(st,h) for p,st,h,b in results}
for p,st,h,b in results:
 print(st,p,'ERROR UI' if 'We couldn’t load this page' in b else '')
 if st!='200' or 'We couldn’t load this page' in b:errors.append((p,st))
links=set(a for p,st,h,b in results for a in h.links+h.assets if a.startswith('/'))
def checklink(l):
 u=urlsplit(l);p=u.path + ("?"+u.query if u.query else "")
 if p in cache:st,h=cache[p]
 else:_,st,h,b=get(l)
 fail=[]
 if st!='200':fail.append((l,st))
 if u.fragment and u.fragment not in h.ids:fail.append((l,'missing anchor'))
 return fail
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as ex:
 for fail in ex.map(checklink,sorted(links)):errors.extend(fail)
print('CHECKED',len(paths),'pages and',len(links),'internal links/assets')
print('FAILURES',errors)
for p in ['/missing-page','/projects/not-a-project','/projects/aaaaaaaaaaaaaaa','/team/not-a-person']:
 _,st,h,b=get(p);print('MISSING',st,p,'not-found marker', 'Page not found' in b)

 if st != "404" or "Page not found" not in b: errors.append((p, "Expected a helpful 404"))
sys.exit(1 if errors else 0)
