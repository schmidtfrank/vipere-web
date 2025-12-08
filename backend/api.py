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

@routes.get("/raids")
async def getRaid(req : web.Request) -> web.Response:
    con = sqlite3.connect("vipere.db")
    cur = con.cursor()

    response = cur.execute("SELECT OppName, Outcome FROM Raids")
    raidOutcomes = response.fetchall()

    returnList = []
    for Opponent, Outcome in raidOutcomes:
        currVal = dict()
        currVal["OppName"] = Opponent
        currVal["Outcome"] = Outcome
        returnList.append(currVal)
    return web.json_response(data=returnList)

@routes.get("/scrimmages")
async def getScrims(req : web.Request) -> web.Response:
    con = sqlite3.connect("vipere.db")
    cur = con.cursor()

    response = cur.execute("SELECT OppName, VipereScore, OppScore, Outcome FROM Scrimmages")
    scrimOutcomes = response.fetchall()

    returnList = []
    for OppName, VipereScore, OppScore, Outcomes in scrimOutcomes:
        curr = dict()
        curr["OppName"] = OppName
        curr["VipereScore"] = VipereScore
        curr["OppScore"] = OppScore
        curr["Outcome"] = Outcomes
        returnList.append(curr)
    return web.json_response(data=returnList)

@routes.get("/medal/{id}")
async def getMedalRecipients(req : web.Request) -> web.Response:
    #get medalID
    medalID = req.match_info["id"]
    medalID = int(medalID)
    if medalID in [1,2,3]:
        pass
    else:
        print("hit!")
        return web.Response(status=400)
    
    con = sqlite3.connect("vipere.db")
    cur = con.cursor()

    response = cur.execute(f"SELECT Username FROM People p JOIN UserMedals um ON p.UserID = um.UserID WHERE um.MedalID = {medalID}")
    medalRecipients = response.fetchall()

    returnList = []
    for Username in medalRecipients:
        curr = dict()
        curr["name"] = Username
        returnList.append(curr)
    return web.json_response(data=returnList)

@routes.post("/login")
async def checkLogin(req : web.Request) -> web.Response:
    request = await req.json()

    attemptUsername = request["user"]
    attemptPassword = request["password"]

    con = sqlite3.connect("admin.db")
    cur = con.cursor()

    response = cur.execute("SELECT AdminPassword FROM AdminAccess WHERE AdminUsername = ?", (attemptUsername,))
    isAdmin = response.fetchone()
    
    if isAdmin is None:
        #invalid user
        print("invalid user!")
        return web.Response(status=400)
    elif attemptPassword == isAdmin[0]:
        #valid password
        print("valid password!")
        return web.json_response(status=200, data={"success": True})
    
    #invalid password
    print("invalid password!")
    return web.Response(status=400)

@routes.post("/raid")
async def addRaid(req : web.Request) -> web.Response:
    #request sent as request["opponent"] : string, request["outcome"] : char
    request = await req.json()

    opponent = request["opponent"]
    outcome = request["outcome"]

    con = sqlite3.connect("vipere.db")
    cur = con.cursor()

    cur.execute("INSERT INTO Raids VALUES ((SELECT MAX(RaidID) FROM Raids)+1,?,?)",(opponent,outcome,))
    
    #close transaction
    con.commit()
    return web.Response(status=200)

@routes.post("/scrimmage")
async def addScrimmage(req : web.Request) -> web.Response:
    #opponentName : string , opponentScore : int, vipereScore : int, outcome : char
    request = await req.json()

    opponent = request["opponentName"]
    opponentScore = request["opponentScore"]
    vipereScore = request["vipereScore"]
    outcome = request["outcome"]

    con = sqlite3.connect("vipere.db")
    cur = con.cursor()

    cur.execute("INSERT INTO Scrimmages VALUES((SELECT MAX(ScrimID) FROM Scrimmages)+1,?,?,?,?)",(vipereScore,opponentScore,opponent,outcome,))

    #commit transaction
    con.commit()
    return web.Response(status=200)

@routes.post("/medal")
async def addAward(req : web.Request) -> web.Response:
    #user : string, medal : string
    request = await req.json()
    user = request["user"]
    medal = request["medal"]

    #connect to db
    con = sqlite3.connect("vipere.db")
    cur = con.cursor()

    #get relevant user/medal info for insertion
    medalQuery = cur.execute("SELECT MedalID FROM Medals WHERE MedalName = ?", (medal,))
    medalID = medalQuery.fetchone()[0]

    userQuery = cur.execute("SELECT UserID FROM People WHERE Username = ?", (user,))
    userID = userQuery.fetchone()[0]

    cur.execute("INSERT INTO UserMedals VALUES (?, ?)",(userID,medalID,))

    #commit
    con.commit()
    return web.Response(status=200)




if __name__ == '__main__':
    app = web.Application(middlewares=[
        cors_middleware(origins=["http://localhost:3000"])
    ])
    app.add_routes(routes)
    web.run_app(app, host="0.0.0.0",port=8000)