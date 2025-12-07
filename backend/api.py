import aiohttp
import asyncio
from aiohttp import web
from aiohttp_middlewares import cors_middleware
import sqlite3
import random

routes = web.RouteTableDef()

@routes.get("/quote")
async def getQuote(req : web.Request) -> web.Response:
    #connect to db
    con = sqlite3.connect("vipere.db")
    cur = con.cursor()
    
    #find out how many quotes we have
    response = cur.execute("SELECT MAX(QuoteID) FROM Quotes")
    maxQuote = response.fetchone()[0]

    #pick random quote to return
    quoteNum = random.randint(1,maxQuote)

    response = cur.execute(f"SELECT QuoteText, QuoteAuthor FROM Quotes WHERE QuoteID = {quoteNum}")
    quoteText, quoteAuthor = response.fetchone()

    returnVal = dict()
    returnVal["text"] = quoteText
    returnVal["author"] = quoteAuthor
    return web.json_response(data=returnVal, status=200)

@routes.get("/vipere")
async def getViperes(req : web.Request) -> web.Response:
    #connect to db
    con = sqlite3.connect("vipere.db")
    cur = con.cursor()

    #get all viperes
    response = cur.execute("SELECT Username, Rank FROM People WHERE Division = \"Vipere\"")
    viperes = response.fetchall()
    
    #iter through for a list of user and rank
    returnList = []
    for user, rank in viperes:
        currVal = dict()
        currVal["username"] = user
        currVal["rank"] = rank
        returnList.append(currVal)
    return web.json_response(data=returnList, status=200)

@routes.get("/hydras")
async def getHydras(req : web.Request) -> web.Response:
    con = sqlite3.connect("vipere.db")
    cur = con.cursor()

    #get all viperes
    response = cur.execute("SELECT Username, Rank FROM People WHERE Division = \"Kingdom of Viperia\"")
    viperes = response.fetchall()
    
    #iter through for a list of user and rank
    returnList = []
    for user, rank in viperes:
        currVal = dict()
        currVal["username"] = user
        currVal["rank"] = rank
        returnList.append(currVal)
    return web.json_response(data=returnList, status=200)

if __name__ == '__main__':
    app = web.Application(middlewares=[
        cors_middleware(origins=["http://localhost:3000"])
    ])
    app.add_routes(routes)
    web.run_app(app, host="0.0.0.0",port=8000)