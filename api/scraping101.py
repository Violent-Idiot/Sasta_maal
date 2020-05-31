import requests
from selenium import webdriver
from bs4 import BeautifulSoup as bs
inp=input("Enter flipkart link of the product- ")
#chromedriver = "C:\\Users\\crazy\\Desktop\\chromedriver"
#driver=webdriver.Chrome(chromedriver)
#driver.get(inp)
#price=driver.find_element_by_xpath('/html/body/div[1]/div/div[3]/div[2]/div[1]/div[2]/div[2]/div/div[3]/div[1]/div/div[1]')
#print(price)
txt=requests.get(inp).text
soup=bs(txt,features="html.parser")
ttle=soup.title.text
print("The title of the page is:",ttle)
a = soup.find("div", {"class":"_1vC4OE _3qQ9m1"})
#b=a.text  (works!)
x=a.contents
print("The Price is:", x[0][1:])
#price=soup.find(text="₹").findNext('div')
#print(price)
