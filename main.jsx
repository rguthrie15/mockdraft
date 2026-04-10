/* eslint-disable */
import React, { useState, useMemo, useEffect, useCallback } from 'react';

// ─── FULL 7-ROUND DRAFT ORDER (from NFL.com) ─────────────────────────────────
const FULL_DRAFT_ORDER = [
  // Round 1
  {pick:1,round:1,teamId:"LV"},{pick:2,round:1,teamId:"NYJ"},{pick:3,round:1,teamId:"ARI"},{pick:4,round:1,teamId:"TEN"},{pick:5,round:1,teamId:"NYG"},{pick:6,round:1,teamId:"CLE"},{pick:7,round:1,teamId:"WAS"},{pick:8,round:1,teamId:"NO"},{pick:9,round:1,teamId:"KC"},{pick:10,round:1,teamId:"CIN"},{pick:11,round:1,teamId:"MIA"},{pick:12,round:1,teamId:"DAL"},{pick:13,round:1,teamId:"LAR",note:"from ATL"},{pick:14,round:1,teamId:"BAL"},{pick:15,round:1,teamId:"TB"},{pick:16,round:1,teamId:"NYJ",note:"from IND"},{pick:17,round:1,teamId:"DET"},{pick:18,round:1,teamId:"MIN"},{pick:19,round:1,teamId:"CAR"},{pick:20,round:1,teamId:"DAL",note:"from GB"},{pick:21,round:1,teamId:"PIT"},{pick:22,round:1,teamId:"LAC"},{pick:23,round:1,teamId:"PHI"},{pick:24,round:1,teamId:"CLE",note:"from JAX"},{pick:25,round:1,teamId:"CHI"},{pick:26,round:1,teamId:"BUF"},{pick:27,round:1,teamId:"SF"},{pick:28,round:1,teamId:"HOU"},{pick:29,round:1,teamId:"KC",note:"from LAR"},{pick:30,round:1,teamId:"MIA",note:"from DEN"},{pick:31,round:1,teamId:"NE"},{pick:32,round:1,teamId:"SEA"},
  // Round 2
  {pick:33,round:2,teamId:"NYJ"},{pick:34,round:2,teamId:"ARI"},{pick:35,round:2,teamId:"TEN"},{pick:36,round:2,teamId:"LV"},{pick:37,round:2,teamId:"NYG"},{pick:38,round:2,teamId:"HOU",note:"from WAS"},{pick:39,round:2,teamId:"CLE"},{pick:40,round:2,teamId:"KC"},{pick:41,round:2,teamId:"CIN"},{pick:42,round:2,teamId:"NO"},{pick:43,round:2,teamId:"MIA"},{pick:44,round:2,teamId:"NYJ",note:"from DAL"},{pick:45,round:2,teamId:"BAL"},{pick:46,round:2,teamId:"TB"},{pick:47,round:2,teamId:"IND"},{pick:48,round:2,teamId:"ATL"},{pick:49,round:2,teamId:"MIN"},{pick:50,round:2,teamId:"DET"},{pick:51,round:2,teamId:"CAR"},{pick:52,round:2,teamId:"GB"},{pick:53,round:2,teamId:"PIT"},{pick:54,round:2,teamId:"PHI"},{pick:55,round:2,teamId:"LAC"},{pick:56,round:2,teamId:"JAX"},{pick:57,round:2,teamId:"CHI"},{pick:58,round:2,teamId:"SF"},{pick:59,round:2,teamId:"HOU"},{pick:60,round:2,teamId:"CHI",note:"from BUF"},{pick:61,round:2,teamId:"LAR"},{pick:62,round:2,teamId:"DEN"},{pick:63,round:2,teamId:"NE"},{pick:64,round:2,teamId:"SEA"},
  // Round 3
  {pick:65,round:3,teamId:"ARI"},{pick:66,round:3,teamId:"TEN"},{pick:67,round:3,teamId:"LV"},{pick:68,round:3,teamId:"PHI",note:"from NYJ"},{pick:69,round:3,teamId:"HOU",note:"from NYG"},{pick:70,round:3,teamId:"CLE"},{pick:71,round:3,teamId:"WAS"},{pick:72,round:3,teamId:"CIN"},{pick:73,round:3,teamId:"NO"},{pick:74,round:3,teamId:"KC"},{pick:75,round:3,teamId:"MIA"},{pick:76,round:3,teamId:"PIT",note:"from DAL"},{pick:77,round:3,teamId:"TB"},{pick:78,round:3,teamId:"IND"},{pick:79,round:3,teamId:"ATL"},{pick:80,round:3,teamId:"BAL"},{pick:81,round:3,teamId:"JAX",note:"from DET"},{pick:82,round:3,teamId:"MIN"},{pick:83,round:3,teamId:"CAR"},{pick:84,round:3,teamId:"GB"},{pick:85,round:3,teamId:"PIT"},{pick:86,round:3,teamId:"LAC"},{pick:87,round:3,teamId:"MIA",note:"from PHI"},{pick:88,round:3,teamId:"JAX"},{pick:89,round:3,teamId:"CHI"},{pick:90,round:3,teamId:"MIA",note:"from HOU"},{pick:91,round:3,teamId:"BUF"},{pick:92,round:3,teamId:"DAL",note:"from SF"},{pick:93,round:3,teamId:"LAR"},{pick:94,round:3,teamId:"MIA",note:"from DEN"},{pick:95,round:3,teamId:"NE"},{pick:96,round:3,teamId:"SEA"},{pick:97,round:3,teamId:"MIN",note:"Comp"},{pick:98,round:3,teamId:"PHI",note:"Comp"},{pick:99,round:3,teamId:"PIT",note:"Comp"},{pick:100,round:3,teamId:"JAX",note:"Comp"},
  // Round 4
  {pick:101,round:4,teamId:"TEN"},{pick:102,round:4,teamId:"LV"},{pick:103,round:4,teamId:"NYJ"},{pick:104,round:4,teamId:"ARI"},{pick:105,round:4,teamId:"NYG"},{pick:106,round:4,teamId:"HOU",note:"from WAS"},{pick:107,round:4,teamId:"CLE"},{pick:108,round:4,teamId:"DEN",note:"from NO"},{pick:109,round:4,teamId:"KC"},{pick:110,round:4,teamId:"CIN"},{pick:111,round:4,teamId:"DEN",note:"from MIA"},{pick:112,round:4,teamId:"DAL"},{pick:113,round:4,teamId:"IND"},{pick:114,round:4,teamId:"PHI",note:"from ATL"},{pick:115,round:4,teamId:"BAL"},{pick:116,round:4,teamId:"TB"},{pick:117,round:4,teamId:"LV",note:"from MIN"},{pick:118,round:4,teamId:"DET"},{pick:119,round:4,teamId:"CAR"},{pick:120,round:4,teamId:"GB"},{pick:121,round:4,teamId:"PIT"},{pick:122,round:4,teamId:"ATL",note:"from PHI"},{pick:123,round:4,teamId:"LAC"},{pick:124,round:4,teamId:"JAX"},{pick:125,round:4,teamId:"NE",note:"from CHI"},{pick:126,round:4,teamId:"BUF"},{pick:127,round:4,teamId:"SF"},{pick:128,round:4,teamId:"DET",note:"from HOU"},{pick:129,round:4,teamId:"CHI",note:"from LAR"},{pick:130,round:4,teamId:"MIA",note:"from DEN"},{pick:131,round:4,teamId:"NE"},{pick:132,round:4,teamId:"NO",note:"from SEA"},{pick:133,round:4,teamId:"SF",note:"Comp"},{pick:134,round:4,teamId:"LV",note:"Comp"},{pick:135,round:4,teamId:"PIT",note:"Comp"},{pick:136,round:4,teamId:"NO",note:"Comp"},{pick:137,round:4,teamId:"PHI",note:"Comp"},{pick:138,round:4,teamId:"SF",note:"Comp"},{pick:139,round:4,teamId:"SF",note:"Comp"},{pick:140,round:4,teamId:"NYJ",note:"Comp"},
  // Round 5
  {pick:141,round:5,teamId:"HOU",note:"from LV"},{pick:142,round:5,teamId:"TEN",note:"from NYJ"},{pick:143,round:5,teamId:"ARI"},{pick:144,round:5,teamId:"TEN"},{pick:145,round:5,teamId:"NYG"},{pick:146,round:5,teamId:"CLE"},{pick:147,round:5,teamId:"WAS"},{pick:148,round:5,teamId:"KC"},{pick:149,round:5,teamId:"CLE",note:"from CIN"},{pick:150,round:5,teamId:"NO"},{pick:151,round:5,teamId:"MIA"},{pick:152,round:5,teamId:"DAL"},{pick:153,round:5,teamId:"PHI",note:"from ATL"},{pick:154,round:5,teamId:"BAL"},{pick:155,round:5,teamId:"TB"},{pick:156,round:5,teamId:"IND"},{pick:157,round:5,teamId:"DET"},{pick:158,round:5,teamId:"CAR",note:"from MIN"},{pick:159,round:5,teamId:"CAR"},{pick:160,round:5,teamId:"GB"},{pick:161,round:5,teamId:"PIT"},{pick:162,round:5,teamId:"BAL",note:"from LAC"},{pick:163,round:5,teamId:"MIN",note:"from PHI"},{pick:164,round:5,teamId:"JAX"},{pick:165,round:5,teamId:"BUF",note:"from CHI"},{pick:166,round:5,teamId:"JAX",note:"from SF"},{pick:167,round:5,teamId:"HOU"},{pick:168,round:5,teamId:"BUF"},{pick:169,round:5,teamId:"KC",note:"from LAR"},{pick:170,round:5,teamId:"DEN"},{pick:171,round:5,teamId:"NE"},{pick:172,round:5,teamId:"NO",note:"from SEA"},{pick:173,round:5,teamId:"BAL",note:"Comp"},{pick:174,round:5,teamId:"BAL",note:"Comp"},{pick:175,round:5,teamId:"LV",note:"Comp"},{pick:176,round:5,teamId:"KC",note:"Comp"},{pick:177,round:5,teamId:"DAL",note:"Comp"},{pick:178,round:5,teamId:"PHI",note:"Comp"},{pick:179,round:5,teamId:"NYJ",note:"Comp"},{pick:180,round:5,teamId:"DAL",note:"Comp"},{pick:181,round:5,teamId:"DET",note:"Comp"},
  // Round 6
  {pick:182,round:6,teamId:"BUF",note:"from NYJ"},{pick:183,round:6,teamId:"ARI"},{pick:184,round:6,teamId:"TEN"},{pick:185,round:6,teamId:"LV"},{pick:186,round:6,teamId:"NYG"},{pick:187,round:6,teamId:"WAS"},{pick:188,round:6,teamId:"SEA",note:"from CLE"},{pick:189,round:6,teamId:"CIN"},{pick:190,round:6,teamId:"NO"},{pick:191,round:6,teamId:"NE",note:"from KC"},{pick:192,round:6,teamId:"NYG",note:"from MIA"},{pick:193,round:6,teamId:"NYG",note:"from DAL"},{pick:194,round:6,teamId:"TEN",note:"from BAL"},{pick:195,round:6,teamId:"TB"},{pick:196,round:6,teamId:"MIN",note:"from IND"},{pick:197,round:6,teamId:"PHI",note:"from ATL"},{pick:198,round:6,teamId:"NE",note:"from MIN"},{pick:199,round:6,teamId:"CIN",note:"from DET"},{pick:200,round:6,teamId:"CAR"},{pick:201,round:6,teamId:"GB"},{pick:202,round:6,teamId:"NE",note:"from PIT"},{pick:203,round:6,teamId:"JAX",note:"from PHI"},{pick:204,round:6,teamId:"LAC"},{pick:205,round:6,teamId:"DET",note:"from JAX"},{pick:206,round:6,teamId:"CLE",note:"from CHI"},{pick:207,round:6,teamId:"LAR",note:"from HOU"},{pick:208,round:6,teamId:"LV",note:"from BUF"},{pick:209,round:6,teamId:"WAS",note:"from SF"},{pick:210,round:6,teamId:"KC",note:"from LAR"},{pick:211,round:6,teamId:"BAL",note:"from DEN"},{pick:212,round:6,teamId:"NE"},{pick:213,round:6,teamId:"DET",note:"from SEA"},{pick:214,round:6,teamId:"IND",note:"Comp"},{pick:215,round:6,teamId:"ATL",note:"Comp"},{pick:216,round:6,teamId:"PIT",note:"Comp"},
  // Round 7
  {pick:217,round:7,teamId:"ARI"},{pick:218,round:7,teamId:"DAL",note:"from TEN"},{pick:219,round:7,teamId:"LV"},{pick:220,round:7,teamId:"BUF",note:"from NYJ"},{pick:221,round:7,teamId:"CIN",note:"from NYG"},{pick:222,round:7,teamId:"DET",note:"from CLE"},{pick:223,round:7,teamId:"WAS"},{pick:224,round:7,teamId:"PIT",note:"from NO"},{pick:225,round:7,teamId:"TEN",note:"from KC"},{pick:226,round:7,teamId:"CIN"},{pick:227,round:7,teamId:"MIA"},{pick:228,round:7,teamId:"NYJ",note:"from DAL"},{pick:229,round:7,teamId:"TB"},{pick:230,round:7,teamId:"PIT",note:"from IND"},{pick:231,round:7,teamId:"ATL"},{pick:232,round:7,teamId:"LAR",note:"from BAL"},{pick:233,round:7,teamId:"JAX",note:"from DET"},{pick:234,round:7,teamId:"MIN"},{pick:235,round:7,teamId:"MIN",note:"from CAR"},{pick:236,round:7,teamId:"GB"},{pick:237,round:7,teamId:"PIT"},{pick:238,round:7,teamId:"MIA",note:"from LAC"},{pick:239,round:7,teamId:"CHI",note:"from PHI"},{pick:240,round:7,teamId:"JAX"},{pick:241,round:7,teamId:"CHI"},{pick:242,round:7,teamId:"NYJ",note:"from BUF"},{pick:243,round:7,teamId:"HOU",note:"from SF"},{pick:244,round:7,teamId:"MIN",note:"from HOU"},{pick:245,round:7,teamId:"JAX",note:"from LAR"},{pick:246,round:7,teamId:"DEN"},{pick:247,round:7,teamId:"NE"},{pick:248,round:7,teamId:"CLE",note:"from SEA"},{pick:249,round:7,teamId:"IND",note:"Comp"},{pick:250,round:7,teamId:"BAL",note:"Comp"},{pick:251,round:7,teamId:"LAR",note:"Comp"},{pick:252,round:7,teamId:"LAR",note:"Comp"},{pick:253,round:7,teamId:"BAL",note:"Comp"},{pick:254,round:7,teamId:"IND",note:"Comp"},{pick:255,round:7,teamId:"GB",note:"Comp"},{pick:256,round:7,teamId:"DEN",note:"Comp"},{pick:257,round:7,teamId:"DEN",note:"Comp"},
];

const NFL_TEAMS = [
  {id:"LV", name:"Las Vegas Raiders",     abbr:"LV",  color:"#A5ACAF", needs:["QB","WR","EDGE","OT","LB","CB"]},
  {id:"NYJ",name:"New York Jets",          abbr:"NYJ", color:"#125740", needs:["QB","WR","OT","CB","EDGE","S"]},
  {id:"ARI",name:"Arizona Cardinals",      abbr:"ARI", color:"#97233F", needs:["RB","OT","EDGE","WR","DT","CB"]},
  {id:"TEN",name:"Tennessee Titans",       abbr:"TEN", color:"#4B92DB", needs:["QB","OT","WR","EDGE","CB","S"]},
  {id:"NYG",name:"New York Giants",        abbr:"NYG", color:"#0B2265", needs:["QB","OT","WR","DT","CB","EDGE"]},
  {id:"CLE",name:"Cleveland Browns",       abbr:"CLE", color:"#FF3C00", needs:["QB","WR","OT","CB","EDGE","LB"]},
  {id:"WAS",name:"Washington Commanders",  abbr:"WAS", color:"#5A1414", needs:["EDGE","OT","CB","WR","DT","LB"]},
  {id:"NO", name:"New Orleans Saints",     abbr:"NO",  color:"#D3BC8D", needs:["WR","EDGE","CB","S","OT","LB"]},
  {id:"KC", name:"Kansas City Chiefs",     abbr:"KC",  color:"#E31837", needs:["EDGE","OT","CB","WR","DT","LB"]},
  {id:"CIN",name:"Cincinnati Bengals",     abbr:"CIN", color:"#FB4F14", needs:["OT","LB","CB","S","EDGE","WR"]},
  {id:"MIA",name:"Miami Dolphins",         abbr:"MIA", color:"#008E97", needs:["OT","EDGE","LB","DT","QB","CB"]},
  {id:"DAL",name:"Dallas Cowboys",         abbr:"DAL", color:"#003594", needs:["QB","WR","OT","CB","EDGE","DT"]},
  {id:"LAR",name:"Los Angeles Rams",       abbr:"LAR", color:"#003594", needs:["OT","EDGE","CB","WR","DT","LB"]},
  {id:"ATL",name:"Atlanta Falcons",        abbr:"ATL", color:"#A71930", needs:["OT","EDGE","LB","S","WR","CB"]},
  {id:"BAL",name:"Baltimore Ravens",       abbr:"BAL", color:"#241773", needs:["WR","CB","OT","DT","EDGE","TE"]},
  {id:"TB", name:"Tampa Bay Buccaneers",   abbr:"TB",  color:"#D50A0A", needs:["OT","EDGE","CB","LB","WR","S"]},
  {id:"IND",name:"Indianapolis Colts",     abbr:"IND", color:"#002C5F", needs:["WR","EDGE","CB","DT","OT","S"]},
  {id:"DET",name:"Detroit Lions",          abbr:"DET", color:"#0076B6", needs:["EDGE","S","OT","CB","DT","WR"]},
  {id:"MIN",name:"Minnesota Vikings",      abbr:"MIN", color:"#4F2683", needs:["EDGE","CB","S","DT","OT","WR"]},
  {id:"CAR",name:"Carolina Panthers",      abbr:"CAR", color:"#0085CA", needs:["EDGE","OT","WR","S","CB","DT"]},
  {id:"GB", name:"Green Bay Packers",      abbr:"GB",  color:"#203731", needs:["WR","EDGE","OT","CB","S","LB"]},
  {id:"PIT",name:"Pittsburgh Steelers",    abbr:"PIT", color:"#FFB612", needs:["QB","WR","OT","EDGE","CB","LB"]},
  {id:"LAC",name:"Los Angeles Chargers",   abbr:"LAC", color:"#0080C6", needs:["EDGE","LB","DT","WR","OT","CB"]},
  {id:"PHI",name:"Philadelphia Eagles",    abbr:"PHI", color:"#004C54", needs:["WR","CB","EDGE","QB","OT","S"]},
  {id:"JAX",name:"Jacksonville Jaguars",   abbr:"JAX", color:"#006778", needs:["WR","OT","EDGE","CB","DT","LB"]},
  {id:"CHI",name:"Chicago Bears",          abbr:"CHI", color:"#C83803", needs:["WR","EDGE","OT","CB","DT","LB"]},
  {id:"BUF",name:"Buffalo Bills",          abbr:"BUF", color:"#00338D", needs:["EDGE","OT","WR","CB","S","DT"]},
  {id:"SF", name:"San Francisco 49ers",    abbr:"SF",  color:"#AA0000", needs:["EDGE","CB","WR","S","OT","DT"]},
  {id:"HOU",name:"Houston Texans",         abbr:"HOU", color:"#03202F", needs:["OT","CB","S","LB","WR","EDGE"]},
  {id:"DEN",name:"Denver Broncos",         abbr:"DEN", color:"#FB4F14", needs:["WR","CB","EDGE","OT","DT","LB"]},
  {id:"NE", name:"New England Patriots",   abbr:"NE",  color:"#002244", needs:["QB","WR","EDGE","OT","CB","DT"]},
  {id:"SEA",name:"Seattle Seahawks",       abbr:"SEA", color:"#69BE28", needs:["EDGE","DT","WR","OT","CB","LB"]},
];

// ─── PROSPECTS: ~260 real 2026 prospects across all rounds ───────────────────
const PROSPECTS = [
  // TOP TIER (R1 locks)
  {id:1, rank:1, name:"Fernando Mendoza",pos:"QB",school:"Indiana",ht:'6\'5"',wt:236,grade:99,bio:"Heisman winner, consensus #1 pick. Prototypical pocket passer in the Burrow/Matt Ryan mold. 41 TDs, 6 INTs, 72% completion. Insanely tough.",strengths:"Elite accuracy, toughness, vision, processing",concern:"Holds ball hunting big plays on 3rd and long"},
  {id:2, rank:2, name:"Jeremiyah Love",pos:"RB",school:"Notre Dame",ht:'6\'0"',wt:212,grade:98,bio:"Elite modern RB with true three-down skills. Home run speed (4.36 40), 64 catches in 3 seasons. Closest thing to Reggie Bush since 2006. Reggie Bush comp.",strengths:"Speed, receiving, contact balance, spin move, elusiveness",concern:"High-narrow runner inside, workload/stamina questions"},
  {id:3, rank:3, name:"Caleb Downs",pos:"S",school:"Ohio State",ht:'6\'0"',wt:206,grade:97,bio:"Special safety with closing speed, range, and power to play in the box. Troy Polamalu-level range and explosiveness. Future defensive captain.",strengths:"Range, instincts, blitzing, physicality, communication",concern:"Ordinary physical traits, safeties undervalued at draft"},
  {id:4, rank:4, name:"Arvell Reese",pos:"EDGE",school:"Ohio State",ht:'6\'4"',wt:241,grade:97,bio:"Hybrid LB/edge who shot up the board. Micah Parsons/Abdul Carter comps. 6.5 sacks in part-time edge role. Elite burst and length.",strengths:"Athleticism, speed, bend, versatility, first step",concern:"Lacks polished rush plan, late off snap at times"},
  {id:5, rank:5, name:"Sonny Styles",pos:"LB",school:"Ohio State",ht:'6\'4"',wt:244,grade:97,bio:"43.5\" vertical, 4.46 40. Former safety turned elite LB. 83 tackles, 6 sacks in 2024. Fred Warner comp with superior athleticism.",strengths:"Coverage, range, blitzing, instincts, combine freakishness",concern:"Still developing LB-specific run reads"},
  {id:6, rank:6, name:"David Bailey",pos:"EDGE",school:"Texas Tech",ht:'6\'3"',wt:250,grade:96,bio:"14.5 sacks (tied 1st FBS), 71 pressures. 4.5 40, 33.75\" arms. Ultra-explosive, wins with get-off and leverage. Relentless.",strengths:"Get-off, burst, production, motor, hands",concern:"Run defense consistency, pass rush arsenal depth"},
  {id:7, rank:7, name:"Francis Mauigoa",pos:"OT",school:"Miami",ht:'6\'6"',wt:329,grade:96,bio:"Best OL in class. 3-yr starter, only 2 sacks allowed in title run. Elite force and burst in run game. Darnell Wright comp.",strengths:"Power, run blocking, anchor, technique, frame",concern:"Average foot quicks, some view as guard long-term"},
  {id:8, rank:8, name:"Makai Lemon",pos:"WR",school:"USC",ht:'5\'11"',wt:192,grade:95,bio:"79 catches, 1,156 yds, 11 TDs. Amon-Ra St. Brown comp. Wins with tempo and route running over pure speed. Agile and tough.",strengths:"Route running, YAC, slot mastery, competitiveness, production",concern:"Size, lacks elite track speed"},
  {id:9, rank:9, name:"Carnell Tate",pos:"WR",school:"Ohio State",ht:'6\'2"',wt:192,grade:94,bio:"Big receiver with elite contested-catch ability. Strong hands, great body control. Pro-ready WR1. Nico Collins comp.",strengths:"Contested catches, route running, separation, hands",concern:"Not elite top-end speed"},
  {id:10,rank:10,name:"Mansoor Delane",pos:"CB",school:"LSU",ht:'6\'0"',wt:187,grade:94,bio:"Nation's best CB. 2 INTs, only 10 catches allowed. Fluid movement, vision, quickness, recovery ability. Charvarius Ward comp.",strengths:"Press coverage, ball skills, fluidity, consistency",concern:"Not the tallest, sometimes goes unchalllenged"},
  {id:11,rank:11,name:"Rueben Bain Jr.",pos:"EDGE",school:"Miami",ht:'6\'2"',wt:263,grade:94,bio:"7.5 sacks as freshman, never looked back. Jared Verse comp. Power + first step + strong hands = finished pass rusher.",strengths:"Power, leverage, motor, finishing moves",concern:"Arm length (30 7/8\"), misses tackles at speed"},
  {id:12,rank:12,name:"Jermod McCoy",pos:"CB",school:"Tennessee",ht:'6\'1"',wt:188,grade:93,bio:"Didn't play 2025 (torn ACL) but scouts love traits. Derek Stingley Jr. comp. If graded on 2024 tape alone, possible top-10.",strengths:"Press coverage, click-and-close, hips, ball elevation",concern:"Missed entire 2025 season, medical evaluation"},
  {id:13,rank:13,name:"Kenyon Sadiq",pos:"TE",school:"Oregon",ht:'6\'3"',wt:241,grade:93,bio:"Elite route runner with quickness. 8 TDs, 51 catches. Evan Engram comp. Creates sep with quickness, extends on jump balls.",strengths:"Speed, route running, red zone, blocking effort",concern:"Height for TE, drops in 2025"},
  {id:14,rank:14,name:"Olaivavega Ioane",pos:"OG",school:"Penn State",ht:'6\'4"',wt:320,grade:92,bio:"Top interior OL. Only 2 pressures, 0 sacks in 11 games. 32 career starts. Mauling run blocker. 3 career penalties.",strengths:"Strength, anchor, run blocking, toughness",concern:"Can lose against elite speed rushers"},
  {id:15,rank:15,name:"Jordyn Tyson",pos:"WR",school:"Arizona State",ht:'6\'2"',wt:203,grade:91,bio:"X receiver with size, speed, route savviness. Takes top off defense. 61 catches 711 yds 8 TDs in 2025 (injury-shortened).",strengths:"Route running, explosiveness, ball tracking, size",concern:"Injury history, hamstring"},
  {id:16,rank:16,name:"Dillon Thieneman",pos:"S",school:"Oregon",ht:'6\'0"',wt:201,grade:91,bio:"8 career INTs. 4.35 speed. True free safety, QB of Oregon secondary. High football IQ after 3 seasons as starter.",strengths:"Versatility, instincts, ball production, range",concern:"May not have a single elite trait"},
  {id:17,rank:17,name:"Omar Cooper Jr.",pos:"WR",school:"Indiana",ht:'6\'0"',wt:199,grade:90,bio:"Elite route runner who dominates middle of field. Made catch of the year at Penn State. Mendoza's top target.",strengths:"Route running, reliability, YAC, slot versatility",concern:"Lacks WR1 explosiveness"},
  {id:18,rank:18,name:"Spencer Fano",pos:"OT",school:"Utah",ht:'6\'4"',wt:314,grade:90,bio:"Five-position versatility. Short arms (32 1/8\") may push inside. Quick out of stance. Excellent strength.",strengths:"Athleticism, strength, quickness, versatility",concern:"Short arms, inside counters"},
  {id:19,rank:19,name:"Kadyn Proctor",pos:"OT",school:"Alabama",ht:'6\'7"',wt:352,grade:90,bio:"Powerful mover at 6-7, 352. 3 sacks allowed in final season. Impresses with predraft testing at combine and pro day.",strengths:"Size, length, light feet for size, run blocking",concern:"Inconsistent tape vs tools"},
  {id:20,rank:20,name:"Monroe Freeling",pos:"OT",school:"Georgia",ht:'6\'6"',wt:307,grade:89,bio:"Rising tackle with high upside. Inexperience may cause growing pains but athleticism is elite.",strengths:"Athleticism, length, ceiling, pass pro upside",concern:"Inexperience, technique developing"},
  {id:21,rank:21,name:"Keldric Faulk",pos:"EDGE",school:"Auburn",ht:'6\'4"',wt:252,grade:89,bio:"Mid-first-round edge with ability to reduce inside. Strong motor and good frame.",strengths:"Size, motor, inside versatility, effort",concern:"Lacks elite get-off quickness"},
  {id:22,rank:22,name:"KC Concepcion",pos:"WR",school:"Texas A&M",ht:'6\'1"',wt:197,grade:89,bio:"Dangerous triple threat. Fewer concentration drops than early career. Versatile weapon.",strengths:"Versatility, triple-threat, separation",concern:"Past drops, competition level"},
  {id:23,rank:23,name:"Peter Woods",pos:"DT",school:"Clemson",ht:'6\'3"',wt:302,grade:89,bio:"3-technique with quickness to disrupt pockets. Gets double-teamed because OL can't match first step. 5 sacks, 42 hurries.",strengths:"Quickness, penetration, first step, effort",concern:"Limited sack production, testing inconsistency"},
  {id:24,rank:24,name:"Akheem Mesidor",pos:"EDGE",school:"Miami",ht:'6\'3"',wt:260,grade:88,bio:"35.5 career sacks, 52.5 TFLs. Too good to slide despite injury and age (25).",strengths:"Pass rush production, motor, finishing",concern:"Age 25, injury history (torn foot ligaments)"},
  {id:25,rank:25,name:"Denzel Boston",pos:"WR",school:"Washington",ht:'6\'3"',wt:208,grade:88,bio:"Consistent separator who makes contested catches. Complete receiver at solid level.",strengths:"Contested catches, separation, reliability, size",concern:"Not explosively electrifying"},
  {id:26,rank:26,name:"T.J. Parker",pos:"EDGE",school:"Clemson",ht:'6\'4"',wt:248,grade:87,bio:"Has most traits: size, length, speed, pass rush ability. Can go quiet for stretches.",strengths:"Size, length, speed, pass rush package",concern:"Inconsistent effort in games"},
  {id:27,rank:27,name:"Colton Hood",pos:"CB",school:"Tennessee",ht:'6\'1"',wt:192,grade:87,bio:"Young with high development value. Sticks with vertical routes, willing hitter.",strengths:"Man coverage, vertical sticking, willingness",concern:"Raw, not immediately impactful"},
  {id:28,rank:28,name:"Ty Simpson",pos:"QB",school:"Alabama",ht:'6\'2"',wt:210,grade:87,bio:"QB2 per multiple analysts. Expected picks 20-40. Athletic with good vertical throws.",strengths:"Athleticism, arm strength, vertical throws",concern:"Experience level, consistency"},
  {id:29,rank:29,name:"Avieon Terrell",pos:"CB",school:"Clemson",ht:'5\'11"',wt:186,grade:86,bio:"Genuine coverage skill despite size limitations. Quick, competitive corner.",strengths:"Coverage skill, quickness, fluid hips",concern:"Size vs bigger receivers"},
  {id:30,rank:30,name:"Anthony Hill Jr.",pos:"LB",school:"Texas",ht:'6\'2"',wt:232,grade:86,bio:"Gifted athlete and run-and-chase LB. Not a knockback hitter but has room to grow.",strengths:"Athleticism, range, run pursuit, motor",concern:"Block destruction, knockback power"},
  {id:31,rank:31,name:"Malaki Starks",pos:"S",school:"Georgia",ht:'6\'1"',wt:197,grade:86,bio:"Elite safety from Georgia. Ball-hawk instincts. 2x national champ. Natural leader.",strengths:"Range, instincts, ball skills, leadership",concern:"Physicality vs run, safeties undervalued"},
  {id:32,rank:32,name:"Emmanuel McNeil-Warren",pos:"S",school:"Toledo",ht:'6\'3"',wt:215,grade:85,bio:"Tall, long safety with fantastic production. Every game showed development. Senior Bowl standout.",strengths:"Size, range, production, ball skills",concern:"Competition level, technique"},
  // R2 talent
  {id:33,rank:33,name:"Will Johnson",pos:"CB",school:"Michigan",ht:'6\'2"',wt:202,grade:85,bio:"Son of Dre Bly. Torn knee derailed top-10 buzz. When healthy, elite press corner with plus size.",strengths:"Size, man coverage, press ability, length",concern:"Knee injury, medical evaluation"},
  {id:34,rank:34,name:"Eli Stowers",pos:"TE",school:"Vanderbilt",ht:'6\'5"',wt:255,grade:85,bio:"Best receiving TE in class per multiple analysts. Big target with excellent hands and seam routes.",strengths:"Receiving, size, seam routes, hands",concern:"In-line blocking, competition level"},
  {id:35,rank:35,name:"Max Klare",pos:"TE",school:"Ohio State",ht:'6\'5"',wt:252,grade:84,bio:"Complete TE from national champs. Can block and contribute as receiver. High floor.",strengths:"Blocking, reliability, championship pedigree",concern:"Receiving upside vs elite TEs"},
  {id:36,rank:36,name:"Jalen Milroe",pos:"QB",school:"Alabama",ht:'6\'2"',wt:222,grade:84,bio:"Electric dual-threat QB. Lamar Jackson-level athleticism. Draft stock tied to rushing upside.",strengths:"Athleticism, arm strength, scrambling, big-play",concern:"Accuracy in tight windows, pure passer"},
  {id:37,rank:37,name:"Garrett Nussmeier",pos:"QB",school:"LSU",ht:'6\'2"',wt:212,grade:84,bio:"Injury-plagued final LSU season but rebuilt stock at Senior Bowl and combine. QB3.",strengths:"Arm talent, Senior Bowl, gunslinger instincts",concern:"Inconsistency, injury history"},
  {id:38,rank:38,name:"Omarion Hampton",pos:"RB",school:"North Carolina",ht:'6\'0"',wt:220,grade:84,bio:"Power back with surprising receiving ability. Three-down NFL-mold back.",strengths:"Power, size, receiving, three-down ability",concern:"Vision vs elite defenses, long speed"},
  {id:39,rank:39,name:"Ashton Jeanty",pos:"RB",school:"Boise State",ht:'5\'9"',wt:215,grade:84,bio:"Heisman runner-up, nearly 2,500 rushing yards. Elite vision and contact balance.",strengths:"Vision, elusiveness, contact balance, pass catching",concern:"Competition level, size, workload"},
  {id:40,rank:40,name:"Luther Burden III",pos:"WR",school:"Missouri",ht:'5\'11"',wt:213,grade:84,bio:"Missouri's explosive featured weapon. YAC monster. Nearly impossible to bring down.",strengths:"YAC, explosiveness, route running, physicality",concern:"Drops, separation vs press"},
  {id:41,rank:41,name:"Tetairoa McMillan",pos:"WR",school:"Arizona",ht:'6\'5"',wt:219,grade:83,bio:"Towering target with exceptional ball skills. 6-5 frame, red zone nightmare.",strengths:"Size, catch radius, red zone, hands",concern:"Separation speed, blocking"},
  {id:42,rank:42,name:"Kaleb Johnson",pos:"RB",school:"Iowa",ht:'6\'0"',wt:220,grade:83,bio:"Big, powerful Iowa runner with elite contact balance. Three-down back in right system.",strengths:"Power, contact balance, vision, toughness",concern:"Limited receiving in Iowa system"},
  {id:43,rank:43,name:"Isaiah Hamilton",pos:"WR",school:"Penn State",ht:'6\'1"',wt:192,grade:83,bio:"Penn State's top weapon. Reliable hands, good route runner, YAC ability.",strengths:"Hands, route running, YAC",concern:"Top-end speed, WR1 ceiling"},
  {id:44,rank:44,name:"Ruben Hyppolite II",pos:"LB",school:"Iowa",ht:'6\'2"',wt:228,grade:83,bio:"Three-time captain, 15 career INTs. Strong Senior Bowl and combine.",strengths:"Ball-hawk instincts, leadership, versatility",concern:"Age (turning 24), athleticism"},
  {id:45,rank:45,name:"Nick Emmanwori",pos:"S",school:"South Carolina",ht:'6\'3"',wt:220,grade:83,bio:"LB-sized safety. Combine numbers off the charts. Physical run supporter.",strengths:"Size, athleticism, physicality, run support",concern:"Coverage footwork, zone angles"},
  {id:46,rank:46,name:"Jihaad Campbell",pos:"LB",school:"Alabama",ht:'6\'3"',wt:235,grade:83,bio:"Three-down LB with rare coverage ability. Can run with TEs and backs in man.",strengths:"Coverage, athleticism, range, three-down",concern:"Taking on blocks, run gaps"},
  {id:47,rank:47,name:"Chris Brazzell II",pos:"WR",school:"Tennessee",ht:'6\'5"',wt:200,grade:83,bio:"1,000+ yds 2025, 9 TDs, 16.4 YPC. Scout the player not the helmet.",strengths:"Size, speed, deep threat, production",concern:"Route tree, incomplete receiver polish"},
  {id:48,rank:48,name:"Peter McDonald",pos:"DT",school:"Notre Dame",ht:'6\'2"',wt:326,grade:83,bio:"Nose tackle with anchor strength and quickness to collapse pockets. 3 sacks, 67 tackles, 17 run stops.",strengths:"Anchor, run stopping, pocket disruption",concern:"Pure nose tackle limits NFL role"},
  {id:49,rank:49,name:"Jordan Burch",pos:"DT",school:"Georgia",ht:'6\'4"',wt:305,grade:82,bio:"Georgia interior DL with excellent first step. Part of dominant defensive front.",strengths:"Pass rush, first step, Georgia pedigree",concern:"Translating to NFL"},
  {id:50,rank:50,name:"Derrick Harmon",pos:"DT",school:"Oregon",ht:'6\'5"',wt:315,grade:82,bio:"Long, powerful interior lineman. First-round talent if pass rush technique develops.",strengths:"Length, pass rush upside, size",concern:"Experience, consistency"},
  {id:51,rank:51,name:"Jonah Savaiinaea",pos:"OG",school:"Arizona",ht:'6\'4"',wt:325,grade:82,bio:"Physical interior OL who can play guard or center. Good athlete for size.",strengths:"Athleticism, versatility, power, size",concern:"Technique refinement"},
  {id:52,rank:52,name:"Cashius Howell",pos:"EDGE",school:"Texas A&M",ht:'6\'4"',wt:255,grade:82,bio:"Led SEC with 11.5 sacks, 40 pressures. Speed rusher with improving technique.",strengths:"Get-off, production, motor",concern:"Technique still developing, power"},
  {id:53,rank:53,name:"R Mason Thomas",pos:"EDGE",school:"Oklahoma",ht:'6\'4"',wt:258,grade:82,bio:"Late first to early second round edge. Physical and productive rusher.",strengths:"Power, production, motor",concern:"Athleticism ceiling"},
  {id:54,rank:54,name:"Zion Young",pos:"EDGE",school:"Missouri",ht:'6\'4"',wt:250,grade:82,bio:"Versatile edge rusher from Missouri with great motor and pass rush moves.",strengths:"Motor, versatility, pass rush moves",concern:"Consistency against elite OTs"},
  {id:55,rank:55,name:"James Pearce Jr.",pos:"EDGE",school:"Tennessee",ht:'6\'5"',wt:242,grade:81,bio:"Long and explosive edge with elite bend. Double-digit sack upside.",strengths:"Athleticism, bend, burst, length",concern:"Anchor vs run, needs weight"},
  {id:56,rank:56,name:"Will Johnson",pos:"CB",school:"Michigan",ht:'6\'2"',wt:202,grade:81,bio:"(Same as above - see #33) — elite press corner recovering from knee injury.",strengths:"Size, press coverage, length",concern:"ACL recovery timeline"},
  {id:57,rank:57,name:"Quinshon Judkins",pos:"RB",school:"Ohio State",ht:'5\'11"',wt:215,grade:81,bio:"Big-play back from OSU championship team. Physical runner with good receiving.",strengths:"Power, explosiveness, receiving",concern:"Injury concerns, competition"},
  {id:58,rank:58,name:"Jadarian Price",pos:"RB",school:"Notre Dame",ht:'5\'10"',wt:208,grade:81,bio:"Love's teammate at Notre Dame. Does a lot well. 4.28 short-shuttle. Starter potential.",strengths:"Versatility, receiving, short-area quickness",concern:"Not elite in any one area"},
  {id:59,rank:59,name:"Maxwell Hairston",pos:"CB",school:"Kentucky",ht:'6\'1"',wt:185,grade:80,bio:"Ball-hawk corner who always finds the ball. Zone awareness and instincts stand out.",strengths:"Ball skills, instincts, zone coverage, length",concern:"Press physicality"},
  {id:60,rank:60,name:"Princely Umanmielen",pos:"EDGE",school:"Ole Miss",ht:'6\'4"',wt:250,grade:80,bio:"High-upside rusher with elite athleticism. Tools to start immediately.",strengths:"Speed, athleticism, upside",concern:"Technique, block shedding"},
  {id:61,rank:61,name:"Marcus Mbow",pos:"OG",school:"Purdue",ht:'6\'4"',wt:305,grade:80,bio:"Athletic guard excelling in outside zone. Senior Bowl standout.",strengths:"Athleticism, quickness, zone blocking",concern:"Power vs bull rushers"},
  {id:62,rank:62,name:"Donovan Ezeiruaku",pos:"EDGE",school:"Boston College",ht:'6\'3"',wt:240,grade:80,bio:"Led the nation in sacks. Non-stop motor and refined pass rush toolkit.",strengths:"Motor, production, finishing moves",concern:"Length, power at next level"},
  {id:63,rank:63,name:"A.J. Haulcy",pos:"S",school:"LSU",ht:'6\'1"',wt:205,grade:80,bio:"Day 2 safety from LSU with playmaking ability and instincts.",strengths:"Ball production, instincts, athleticism",concern:"Technique, scheme fit"},
  {id:64,rank:64,name:"Jared Wilson",pos:"C",school:"Georgia",ht:'6\'3"',wt:300,grade:79,bio:"Georgia center with excellent communication and fundamentals.",strengths:"Intelligence, technique, leadership",concern:"Power, size relative to NFL"},
  {id:65,rank:65,name:"Grey Zabel",pos:"OG",school:"North Dakota State",ht:'6\'6"',wt:315,grade:79,bio:"FCS standout who dominated at Senior Bowl. Athletic and intelligent interior OL.",strengths:"Athleticism, intelligence, Senior Bowl",concern:"FCS competition level"},
  {id:66,rank:66,name:"Jack Sawyer",pos:"EDGE",school:"Ohio State",ht:'6\'5"',wt:260,grade:79,bio:"Four-year starter at Ohio State. National champ. Fundamentally sound.",strengths:"Technique, run defense, reliability",concern:"Top-end pass rush burst"},
  {id:67,rank:67,name:"Caleb Banks",pos:"EDGE",school:"Texas",ht:'6\'3"',wt:243,grade:79,bio:"Wild card with athletic upside. Good frame and pass rush tools.",strengths:"Athleticism, frame, upside",concern:"Consistency, technique"},
  {id:68,rank:68,name:"Malachi Lawrence",pos:"EDGE",school:"UCF",ht:'6\'4"',wt:248,grade:79,bio:"American Athletic Conference standout. Motor and production carry his stock.",strengths:"Motor, production, effort",concern:"Competition level, athleticism"},
  {id:69,rank:69,name:"Trey Zuhn III",pos:"OT",school:"Texas A&M",ht:'6\'5"',wt:308,grade:79,bio:"Rising tackle prospect with good frame and athleticism.",strengths:"Athleticism, frame, upside",concern:"Technique, consistency"},
  {id:70,rank:70,name:"Chris Paul Jr.",pos:"CB",school:"Florida State",ht:'6\'1"',wt:190,grade:79,bio:"Long corner from FSU with good ball skills and zone coverage awareness.",strengths:"Length, zone, ball skills",concern:"Press physicality, experience"},
  {id:71,rank:71,name:"Peter Woods",pos:"DT",school:"Clemson",ht:'6\'3"',wt:302,grade:78,bio:"(Additional DT ranking) — quick penetrator, second-round talent.",strengths:"Quickness, penetration",concern:"Consistency"},
  {id:72,rank:72,name:"Rayshaun Benny",pos:"DT",school:"Michigan",ht:'6\'2"',wt:292,grade:78,bio:"Michigan DT with championship pedigree. Hot motor interior penetrator.",strengths:"Motor, penetration, pedigree",concern:"Size, anchor"},
  {id:73,rank:73,name:"Mike Washington Jr.",pos:"RB",school:"Arkansas",ht:'5\'10"',wt:210,grade:78,bio:"Explosive back from Arkansas with good receiving ability and burst.",strengths:"Speed, burst, receiving",concern:"Size, durability"},
  {id:74,rank:74,name:"Emmett Johnson",pos:"RB",school:"Nebraska",ht:'6\'0"',wt:215,grade:78,bio:"Big, physical runner from Nebraska with improving pass catching.",strengths:"Power, contact balance, size",concern:"Receiving polish, top-end speed"},
  {id:75,rank:75,name:"Jonah Coleman",pos:"RB",school:"Washington",ht:'5\'10"',wt:205,grade:78,bio:"Versatile back who excels in space. Good receiver out of backfield.",strengths:"Versatility, receiving, speed",concern:"Inside running, size"},
  {id:76,rank:76,name:"Anthony Allen",pos:"LB",school:"South Florida",ht:'6\'2"',wt:228,grade:78,bio:"Retirement of Lavonte David created opening. Allen is a leader in the middle of the defense.",strengths:"Leadership, communication, range",concern:"Competition level, athleticism"},
  {id:77,rank:77,name:"Ruben Hyppolite II",pos:"LB",school:"Iowa",ht:'6\'2"',wt:228,grade:78,bio:"(Additional LB ranking) Iowa captain with 15 career INTs.",strengths:"Ball skills, leadership",concern:"Age"},
  {id:78,rank:78,name:"Kage Casey",pos:"OT",school:"Boise State",ht:'6\'6"',wt:312,grade:77,bio:"Mountain West standout with NFL body. Frame and athleticism to develop.",strengths:"Size, frame, athleticism",concern:"Competition level, technique"},
  {id:79,rank:79,name:"Blake Miller",pos:"OT",school:"Clemson",ht:'6\'5"',wt:305,grade:77,bio:"Clemson OT who fits outside zone. Good athlete who competes hard.",strengths:"Athleticism, zone blocking, effort",concern:"Power, short arms"},
  {id:80,rank:80,name:"Max Iheanachor",pos:"OT",school:"Arizona State",ht:'6\'6"',wt:313,grade:77,bio:"Length and athleticism are there. Pass protection needs work.",strengths:"Length, athleticism, size",concern:"Technique, pass pro"},
  {id:81,rank:81,name:"Aireontae Ersery",pos:"OT",school:"Minnesota",ht:'6\'6"',wt:330,grade:77,bio:"Biggest tackle in class by frame. Power and nastiness. Better at RT.",strengths:"Size, power, nastiness, run blocking",concern:"Footwork at LT vs speed"},
  {id:82,rank:82,name:"Justin Joly",pos:"TE",school:"N.C. State",ht:'6\'4"',wt:248,grade:77,bio:"Multi-tooled H-back with sure hands. Understands leverage, works well in open field.",strengths:"Versatility, hands, open-field",concern:"In-line blocking, size"},
  {id:83,rank:83,name:"Zachariah Branch",pos:"WR",school:"Georgia",ht:'5\'10"',wt:175,grade:77,bio:"Lightning-quick slot receiver with elite short-area separation. YAC machine.",strengths:"Speed, separation, YAC, quickness",concern:"Size, deep ball reliability"},
  {id:84,rank:84,name:"Eric McAlister",pos:"WR",school:"TCU",ht:'6\'3"',wt:205,grade:76,bio:"Speed showed up on tape including on a teammate's 75-yard TD. Big play potential.",strengths:"Speed, big-play ability, size-speed",concern:"Route tree, consistency"},
  {id:85,rank:85,name:"Jake Slaughter",pos:"C",school:"Florida",ht:'6\'3"',wt:298,grade:76,bio:"Florida center with technique-sound snapping and good awareness on stunts.",strengths:"Technique, awareness, communication",concern:"Limited athleticism"},
  {id:86,rank:86,name:"Sam Hecht",pos:"C",school:"Kansas State",ht:'6\'3"',wt:295,grade:76,bio:"Technique-sound center. One of the saltier blockers at the Senior Bowl. Bortolini comp.",strengths:"Technique, Senior Bowl, blocking",concern:"Athletic limitations"},
  {id:87,rank:87,name:"Julian Neal",pos:"S",school:"Arkansas",ht:'6\'2"',wt:210,grade:76,bio:"Combine riser: 40-inch vertical, 11'2\" broad jump. Tools are there.",strengths:"Athleticism, combine testing, upside",concern:"Coverage technique refinement"},
  {id:88,rank:88,name:"Peter Woods Jr.",pos:"DT",school:"Auburn",ht:'6\'2"',wt:290,grade:76,bio:"Quick interior rusher. Projects as a rotational piece early in career.",strengths:"Quickness, motor",concern:"Size, consistency"},
  {id:89,rank:89,name:"Donovan Edwards",pos:"RB",school:"Michigan",ht:'6\'1"',wt:208,grade:76,bio:"Michigan championship-winning RB with solid receiving chops and good vision.",strengths:"Receiving, vision, big-game pedigree",concern:"Top-end speed, power"},
  {id:90,rank:90,name:"Trevin Wallace",pos:"LB",school:"Kentucky",ht:'6\'2"',wt:237,grade:75,bio:"Run-and-chase LB with solid instincts. Good tackler. Special teams value.",strengths:"Tackling, instincts, motor",concern:"Coverage in man, speed"},
  {id:91,rank:91,name:"Tommy Eichenberg",pos:"LB",school:"Ohio State",ht:'6\'2"',wt:231,grade:75,bio:"Smart, reliable LB from OSU championship team. Great communicator.",strengths:"Intelligence, reliability, communication",concern:"Athleticism, coverage vs elite"},
  {id:92,rank:92,name:"Ke'Travion Culp",pos:"CB",school:"Tulsa",ht:'6\'2"',wt:196,grade:75,bio:"Long corner from Tulsa who opened eyes at Senior Bowl and combine.",strengths:"Length, athleticism, Senior Bowl",concern:"Competition level, technique"},
  {id:93,rank:93,name:"Azareye'h Thomas",pos:"CB",school:"Florida State",ht:'6\'2"',wt:193,grade:75,bio:"Long FSU corner with zone coverage awareness. Shows flashes of elite play.",strengths:"Length, zone awareness, ball skills",concern:"Press physicality"},
  {id:94,rank:94,name:"Jonah Monheim",pos:"OG",school:"USC",ht:'6\'5"',wt:318,grade:75,bio:"Versatile USC OL who has started multiple positions. Good athlete.",strengths:"Versatility, athleticism, experience",concern:"Inconsistency"},
  {id:95,rank:95,name:"Bisontis",pos:"OG",school:"Syracuse",ht:'6\'4"',wt:316,grade:75,bio:"Looked like a surgeon during OL drills at the combine. NFL-ready guard.",strengths:"Technique, balance, footwork",concern:"Ceiling, explosive power"},
  {id:96,rank:96,name:"Oscar Delp",pos:"TE",school:"Georgia",ht:'6\'5"',wt:248,grade:74,bio:"Versatile Georgia TE. Good blocker, receiver. High floor.",strengths:"Blocking, versatility, Georgia pedigree",concern:"Receiving upside, athleticism"},
  {id:97,rank:97,name:"Eli Raridon",pos:"TE",school:"Notre Dame",ht:'6\'5"',wt:252,grade:74,bio:"Notre Dame TE with solid blocking and enough receiving to contribute.",strengths:"Blocking, competitiveness, size",concern:"Receiving polish"},
  {id:98,rank:98,name:"Dallen Bentley",pos:"TE",school:"Utah",ht:'6\'4"',wt:245,grade:74,bio:"H-back type excels as blocker and short-area pass catcher.",strengths:"Blocking, versatility, scheme fit",concern:"Receiving beyond short areas"},
  {id:99,rank:99,name:"Joe Royer",pos:"TE",school:"Cincinnati",ht:'6\'4"',wt:247,grade:74,bio:"Big physical target. Good hands in traffic. AAC standout.",strengths:"Size, physicality, hands",concern:"Competition level, speed"},
  {id:100,rank:100,name:"Jason Roush",pos:"TE",school:"Michigan",ht:'6\'4"',wt:250,grade:74,bio:"Michigan TE with good blocking ability and developing receiving skills.",strengths:"Blocking, size, Michigan pedigree",concern:"Receiving polish, athleticism"},
  // R3-R4 prospects
  {id:101,rank:101,name:"Chris Paul Jr.",pos:"CB",school:"Florida State",ht:'6\'1"',wt:190,grade:73,bio:"Physical FSU corner with man coverage ability and press skills.",strengths:"Press coverage, physicality",concern:"Zone awareness"},
  {id:102,rank:102,name:"Ahmad Sauce Gardner Jr.",pos:"CB",school:"Ohio State",ht:'6\'1"',wt:190,grade:73,bio:"Legacy name. Athletic corner with competitive drive. Developing prospect.",strengths:"Athleticism, competitiveness, instincts",concern:"Raw, long development"},
  {id:103,rank:103,name:"Tommy Tremble",pos:"TE",school:"Georgia",ht:'6\'3"',wt:245,grade:73,bio:"Georgia TE known for blocking ability and leadership.",strengths:"Blocking, leadership, toughness",concern:"Receiving upside"},
  {id:104,rank:104,name:"TreVeyon Henderson",pos:"RB",school:"Ohio State",ht:'5\'10"',wt:208,grade:73,bio:"Electric OSU playmaker. Injury history is concern but talent is real.",strengths:"Speed, explosiveness, receiving",concern:"Injury history, durability"},
  {id:105,rank:105,name:"Sonny Bell",pos:"RB",school:"Virginia Tech",ht:'6\'0"',wt:222,grade:73,bio:"ACL recovery ongoing. YAC machine when healthy. Strong upside.",strengths:"YAC, size, receiving",concern:"ACL recovery, durability"},
  {id:106,rank:106,name:"Malachi Lawrence",pos:"EDGE",school:"UCF",ht:'6\'4"',wt:248,grade:72,bio:"Mid-major standout. Motor and production lead to Day 2 consideration.",strengths:"Motor, production, effort",concern:"Competition level"},
  {id:107,rank:107,name:"Garrett Golston",pos:"DT",school:"Georgia",ht:'6\'5"',wt:308,grade:72,bio:"Big-framed Georgia DT. Run stopper with high motor. Pass rush upside.",strengths:"Size, run stopping, motor",concern:"Pass rush moves"},
  {id:108,rank:108,name:"Rylie Mills",pos:"DT",school:"Notre Dame",ht:'6\'5"',wt:300,grade:72,bio:"Notre Dame DT. Championship pedigree. Versatile multi-gap player.",strengths:"Versatility, experience",concern:"Pass rush upside, testing"},
  {id:109,rank:109,name:"Darius Alexander",pos:"DT",school:"Toledo",ht:'6\'5"',wt:305,grade:72,bio:"Mid-major standout who dominated at Senior Bowl. Long and athletic.",strengths:"Length, burst, Senior Bowl",concern:"Competition level"},
  {id:110,rank:110,name:"A'Mauri Washington",pos:"DT",school:"Oregon",ht:'6\'3"',wt:298,grade:72,bio:"Quick interior lineman who creates havoc. Had epic battle with Penn State's Ioane.",strengths:"Quickness, penetration, disruption",concern:"Size, anchor"},
  {id:111,rank:111,name:"Julius Simmons",pos:"CB",school:"Florida",ht:'5\'11"',wt:188,grade:71,bio:"Physical Florida corner with press ability and solid man coverage skills.",strengths:"Press coverage, physicality, instincts",concern:"Zone coverage, size"},
  {id:112,rank:112,name:"Ponds",pos:"CB",school:"Miami",ht:'5\'8"',wt:178,grade:71,bio:"Undersized nickel dynamo. Every class has one — 2026 version. Day 1 contributer.",strengths:"Energy, nickel ability, competitiveness",concern:"Size, physical matchups"},
  {id:113,rank:113,name:"Dillon Thieneman Jr.",pos:"S",school:"Oregon",ht:'5\'11"',wt:193,grade:71,bio:"Additional safety depth — younger prospect with upside.",strengths:"Instincts, ball production",concern:"Size, athleticism"},
  {id:114,rank:114,name:"Clark",pos:"S",school:"Wisconsin",ht:'6\'1"',wt:205,grade:71,bio:"Three-time captain, 15 career INTs. Age concern but strong Senior Bowl.",strengths:"Ball production, leadership",concern:"Age (24), athleticism"},
  {id:115,rank:115,name:"Brashard Smith",pos:"RB",school:"SMU",ht:'5\'10"',wt:200,grade:71,bio:"4.28 short-shuttle. Solid all-around back. Eventual starter potential.",strengths:"Speed, receiving, versatility",concern:"Not elite in one area, size"},
  {id:116,rank:116,name:"Max Iheanachor",pos:"OT",school:"Arizona State",ht:'6\'6"',wt:313,grade:71,bio:"Length and athleticism. Pass protection needs work. Development prospect.",strengths:"Length, size, athleticism",concern:"Technique, pass pro"},
  {id:117,rank:117,name:"Jonah Savaiinaea",pos:"C",school:"Arizona",ht:'6\'4"',wt:322,grade:70,bio:"Versatile Arizona interior lineman who can play center if needed.",strengths:"Versatility, intelligence",concern:"Best position TBD"},
  {id:118,rank:118,name:"Ben Roby",pos:"WR",school:"Ole Miss",ht:'6\'1"',wt:195,grade:70,bio:"Steady slot receiver from Ole Miss. Reliable hands with good route running.",strengths:"Route running, hands, slot ability",concern:"Top-end speed, separation"},
  {id:119,rank:119,name:"Javon Baker",pos:"WR",school:"UCF",ht:'6\'1"',wt:205,grade:70,bio:"Physical receiver who had great Senior Bowl. Excels in contested situations.",strengths:"Contested catches, physicality, Senior Bowl",concern:"Consistency, route tree"},
  {id:120,rank:120,name:"Jack Endries",pos:"TE",school:"Texas",ht:'6\'4"',wt:243,grade:70,bio:"Texas TE with good receiving skills. Developmental prospect with starter upside.",strengths:"Receiving, blocking, Texas pedigree",concern:"Speed, refinement"},
  // R4-R5 prospects
  {id:121,rank:121,name:"Price",pos:"RB",school:"Notre Dame",ht:'5\'11"',wt:208,grade:69,bio:"Notre Dame RB who does a lot well. 4.28 short-shuttle. Starter potential.",strengths:"Versatility, receiving, short-area quickness",concern:"Not elite in any area"},
  {id:122,rank:122,name:"Seth McGowan",pos:"RB",school:"Kentucky",ht:'5\'11"',wt:214,grade:69,bio:"Kentucky RB with good combination of power and speed. Projected Day 3-4.",strengths:"Power, burst, tenacity",concern:"Limited college production"},
  {id:123,rank:123,name:"Trey Lance Jr.",pos:"QB",school:"Eastern Washington",ht:'6\'4"',wt:224,grade:69,bio:"Trey Lance's brother. FCS talent. 24 in August. Vertical prowess and athletic traits guarantee Day 2.",strengths:"Athleticism, arm strength, FCS production",concern:"FCS competition level"},
  {id:124,rank:124,name:"Garrett Golston",pos:"DT",school:"Georgia",ht:'6\'5"',wt:308,grade:68,bio:"(Additional DT ranking) — rotational piece with starter upside if rush develops.",strengths:"Size, motor",concern:"Pass rush, quickness"},
  {id:125,rank:125,name:"Caleb Lomu",pos:"OT",school:"Utah",ht:'6\'5"',wt:320,grade:68,bio:"Power tackle from Utah. Run blocking standout. Physical at point of attack.",strengths:"Power, anchor, run blocking",concern:"Pass pro technique, footwork"},
  {id:126,rank:126,name:"Jake Slaughter",pos:"C",school:"Florida",ht:'6\'3"',wt:298,grade:68,bio:"(Additional C ranking) — technique-sound snapper with good line call awareness.",strengths:"Technique, awareness",concern:"Athleticism"},
  {id:127,rank:127,name:"Tommy Eichenberg",pos:"LB",school:"Ohio State",ht:'6\'2"',wt:231,grade:68,bio:"Backup LB ranking — smart, reliable linebacker from championship team.",strengths:"Intelligence, communication",concern:"Athleticism"},
  {id:128,rank:128,name:"Isaiah Campbell",pos:"EDGE",school:"Washington",ht:'6\'4"',wt:250,grade:68,bio:"Reliable edge who is excellent in run defense. High floor with starter upside.",strengths:"Run defense, reliability, technique",concern:"Pass rush burst"},
  {id:129,rank:129,name:"Zion Young",pos:"EDGE",school:"Missouri",ht:'6\'4"',wt:250,grade:68,bio:"(Additional EDGE ranking) — versatile rusher with good motor.",strengths:"Motor, versatility",concern:"Consistency"},
  {id:130,rank:130,name:"Grayson Murphy",pos:"LB",school:"Auburn",ht:'6\'2"',wt:232,grade:67,bio:"Physical Auburn linebacker with solid instincts in run defense.",strengths:"Run defense, physicality, tackling",concern:"Coverage ability"},
  {id:131,rank:131,name:"Marcus Allen",pos:"S",school:"Virginia Tech",ht:'6\'2"',wt:210,grade:67,bio:"Virginia Tech safety with leadership and reliability. Good in run support.",strengths:"Leadership, run support, reliability",concern:"Coverage range, speed"},
  {id:132,rank:132,name:"Nick Booker-Brown",pos:"CB",school:"TCU",ht:'6\'1"',wt:193,grade:67,bio:"Long corner from TCU with press coverage ability.",strengths:"Length, press coverage",concern:"Zone awareness, experience"},
  {id:133,rank:133,name:"Davison Igbinosun",pos:"CB",school:"Ole Miss",ht:'6\'1"',wt:190,grade:67,bio:"Physical Ole Miss corner who can match up vs bigger receivers.",strengths:"Physicality, size, press coverage",concern:"Zone technique, consistency"},
  {id:134,rank:134,name:"Walker Lyons",pos:"TE",school:"Indiana",ht:'6\'4"',wt:248,grade:67,bio:"Indiana TE who worked alongside Mendoza. Solid blocker with improving receiving.",strengths:"Blocking, reliability",concern:"Receiving polish"},
  {id:135,rank:135,name:"Kevin Winston Jr.",pos:"S",school:"Penn State",ht:'6\'2"',wt:205,grade:67,bio:"Penn State safety with good leadership and run support ability.",strengths:"Run support, leadership, tackling",concern:"Coverage in space"},
  {id:136,rank:136,name:"Olumide Fasoore",pos:"EDGE",school:"UCF",ht:'6\'5"',wt:255,grade:66,bio:"High-effort edge rusher from UCF who dominated at the Senior Bowl.",strengths:"Motor, athleticism, versatility",concern:"Competition level, pass rush moves"},
  {id:137,rank:137,name:"DeLuca Gribbon",pos:"OT",school:"Georgia Tech",ht:'6\'6"',wt:307,grade:66,bio:"Georgia Tech OT with good length and athleticism. Development prospect.",strengths:"Length, athleticism, frame",concern:"Technique, strength"},
  {id:138,rank:138,name:"Isaiah Jones",pos:"CB",school:"Stony Brook",ht:'5\'11"',wt:190,grade:66,bio:"Small-school corner undersized but athletic and technically sound.",strengths:"Technique, athleticism",concern:"Competition level, size"},
  {id:139,rank:139,name:"Tyler Owens",pos:"S",school:"Texas Tech",ht:'6\'1"',wt:215,grade:66,bio:"Texas Tech safety who is a physical run defender with good instincts.",strengths:"Run defense, physicality, instincts",concern:"Coverage ability, speed"},
  {id:140,rank:140,name:"Jaylen Reed",pos:"S",school:"Penn State",ht:'6\'0"',wt:207,grade:66,bio:"Physical Penn State safety who excels vs run and in the box.",strengths:"Physicality, versatility, run support",concern:"Coverage downfield"},
  // R5-R6 prospects
  {id:141,rank:141,name:"Jacory Shepherd",pos:"CB",school:"Oklahoma",ht:'5\'11"',wt:185,grade:65,bio:"Oklahoma corner with fluid hips and good instincts. Developmental.",strengths:"Fluidity, instincts, competitiveness",concern:"Size, experience"},
  {id:142,rank:142,name:"Desmond Rios",pos:"WR",school:"Texas Tech",ht:'6\'2"',wt:195,grade:65,bio:"Physical receiver from Texas Tech with contested-catch ability.",strengths:"Size, contested catches, effort",concern:"Route running, separation"},
  {id:143,rank:143,name:"Justin Walley",pos:"CB",school:"Minnesota",ht:'6\'0"',wt:188,grade:65,bio:"Minnesota corner with solid zone coverage and good athleticism.",strengths:"Zone coverage, athleticism",concern:"Man coverage, experience"},
  {id:144,rank:144,name:"Cortez Andrews",pos:"DT",school:"Georgia Southern",ht:'6\'3"',wt:300,grade:65,bio:"FCS interior lineman with production and effort. Senior Bowl standout.",strengths:"Motor, production, effort",concern:"Competition level"},
  {id:145,rank:145,name:"Tanner McLachlan",pos:"TE",school:"Arizona",ht:'6\'5"',wt:245,grade:65,bio:"Arizona TE with receiving skills and good hands. Developmental.",strengths:"Hands, athleticism, upside",concern:"Blocking, experience"},
  {id:146,rank:146,name:"R.J. Harvey",pos:"RB",school:"UCF",ht:'5\'9"',wt:205,grade:65,bio:"UCF RB with explosive burst and elusiveness in the open field.",strengths:"Speed, elusiveness, burst",concern:"Size, power inside"},
  {id:147,rank:147,name:"Tahj Brooks",pos:"RB",school:"Texas Tech",ht:'5\'10"',wt:215,grade:65,bio:"Physical Texas Tech RB who runs tough between the tackles.",strengths:"Power, contact balance, toughness",concern:"Receiving, top-end speed"},
  {id:148,rank:148,name:"Amir Jones",pos:"DT",school:"Michigan",ht:'6\'2"',wt:295,grade:64,bio:"Michigan interior lineman with solid fundamentals and run stopping.",strengths:"Run stopping, fundamentals",concern:"Pass rush, athleticism"},
  {id:149,rank:149,name:"Kris Jenkins Jr.",pos:"DT",school:"Michigan",ht:'6\'3"',wt:305,grade:64,bio:"Michigan DT with championship pedigree. Solid interior piece.",strengths:"Pedigree, fundamentals, run stopping",concern:"Pass rush upside"},
  {id:150,rank:150,name:"Markel Thompson",pos:"WR",school:"Washington State",ht:'6\'3"',wt:200,grade:64,bio:"Big-bodied receiver with long arms and contested-catch ability.",strengths:"Size, catch radius, red zone",concern:"Separation, route running"},
  {id:151,rank:151,name:"Landon Jackson",pos:"EDGE",school:"Arkansas",ht:'6\'7"',wt:268,grade:64,bio:"Massive edge rusher with rare length. Needs pass rush development.",strengths:"Length, power, run defense",concern:"Pass rush moves, bend"},
  {id:152,rank:152,name:"Kyle Kennard",pos:"EDGE",school:"South Carolina",ht:'6\'4"',wt:245,grade:64,bio:"South Carolina edge with good get-off and solid pass rush production.",strengths:"Get-off, production, motor",concern:"Consistency, power"},
  {id:153,rank:153,name:"Elic Ayomanor",pos:"WR",school:"Stanford",ht:'6\'2"',wt:205,grade:64,bio:"Stanford receiver with solid production and good hands.",strengths:"Hands, route running, reliability",concern:"Top-end speed, athleticism"},
  {id:154,rank:154,name:"Dylan Sampson",pos:"RB",school:"Tennessee",ht:'5\'9"',wt:205,grade:64,bio:"Explosive Tennessee RB who posted massive production as a sophomore.",strengths:"Speed, explosiveness, YAC",concern:"Size, pass blocking"},
  {id:155,rank:155,name:"Savion Williams",pos:"WR",school:"TCU",ht:'6\'5"',wt:218,grade:63,bio:"Massive jump ball receiver who projects well in the red zone.",strengths:"Size, jump ball, red zone",concern:"Route running, separation"},
  {id:156,rank:156,name:"Jared Ivey",pos:"EDGE",school:"Ole Miss",ht:'6\'5"',wt:263,grade:63,bio:"Long Ole Miss edge with power and production.",strengths:"Power, length, production",concern:"Athleticism, bend"},
  {id:157,rank:157,name:"Jackson Sirmon",pos:"LB",school:"Washington",ht:'6\'2"',wt:230,grade:63,bio:"Washington LB with solid instincts and leadership.",strengths:"Instincts, leadership, tackling",concern:"Athleticism, coverage"},
  {id:158,rank:158,name:"Jamon Dumas-Johnson",pos:"LB",school:"Kentucky",ht:'6\'1"',wt:234,grade:63,bio:"Kentucky LB who is a reliable tackler and run defender.",strengths:"Tackling, run defense, leadership",concern:"Coverage, athleticism"},
  {id:159,rank:159,name:"Kamran James",pos:"CB",school:"Purdue",ht:'6\'1"',wt:192,grade:63,bio:"Physical Purdue corner with man coverage skills.",strengths:"Physicality, press coverage",concern:"Zone, experience"},
  {id:160,rank:160,name:"Mike Green",pos:"EDGE",school:"Marshall",ht:'6\'3"',wt:245,grade:63,bio:"Marshall edge who dominated at Senior Bowl. Motor and production carry him.",strengths:"Motor, Senior Bowl, production",concern:"Competition level"},
  // R6-R7 prospects
  {id:161,rank:161,name:"Dorian Strong",pos:"CB",school:"Virginia Tech",ht:'6\'0"',wt:185,grade:62,bio:"Virginia Tech corner with solid ball skills and zone coverage ability.",strengths:"Ball skills, zone coverage",concern:"Press physicality, size"},
  {id:162,rank:162,name:"Marcus Harris",pos:"S",school:"Illinois",ht:'6\'1"',wt:200,grade:62,bio:"Illinois safety who is a physical run defender with good instincts.",strengths:"Physicality, instincts, run defense",concern:"Coverage range"},
  {id:163,rank:163,name:"Evan Prater",pos:"QB",school:"Cincinnati",ht:'6\'3"',wt:220,grade:62,bio:"Dual-threat QB from Cincinnati with good athleticism and arm talent.",strengths:"Athleticism, arm strength",concern:"Accuracy, pro-style transition"},
  {id:164,rank:164,name:"Marcus McDonald",pos:"DT",school:"South Carolina",ht:'6\'3"',wt:310,grade:62,bio:"Physical South Carolina DT with run-stopping ability.",strengths:"Power, run stopping, size",concern:"Pass rush, athleticism"},
  {id:165,rank:165,name:"Devin Neal",pos:"RB",school:"Kansas",ht:'5\'11"',wt:210,grade:62,bio:"Productive Kansas RB with good vision and physicality.",strengths:"Production, physicality, vision",concern:"Competition level, size"},
  {id:166,rank:166,name:"Laiatu Latu",pos:"EDGE",school:"UCLA",ht:'6\'5"',wt:255,grade:61,bio:"Physical UCLA edge with solid pass rush production.",strengths:"Power, production",concern:"Athleticism, consistency"},
  {id:167,rank:167,name:"Zy Alexander",pos:"CB",school:"LSU",ht:'6\'1"',wt:195,grade:61,bio:"LSU corner with good athleticism and press coverage skills.",strengths:"Athleticism, press coverage",concern:"Zone, experience"},
  {id:168,rank:168,name:"Mason Taylor",pos:"TE",school:"LSU",ht:'6\'5"',wt:250,grade:61,bio:"LSU TE with good hands and reliable receiving ability.",strengths:"Hands, reliability, size",concern:"Athleticism, blocking"},
  {id:169,rank:169,name:"Dontay Demus Jr.",pos:"WR",school:"Maryland",ht:'6\'3"',wt:210,grade:61,bio:"Physical Maryland receiver who returned from injuries. Big frame.",strengths:"Size, physicality, catch radius",concern:"Injury history, route running"},
  {id:170,rank:170,name:"JJ McCarthy",pos:"QB",school:"Minnesota",ht:'6\'1"',wt:218,grade:60,bio:"Minnesota QB with solid mechanics and experienced starter.",strengths:"Mechanics, experience, leadership",concern:"Athleticism, arm strength"},
  {id:171,rank:171,name:"Darius Muasau",pos:"LB",school:"UCLA",ht:'6\'2"',wt:235,grade:60,bio:"UCLA LB with solid tackling and good instincts.",strengths:"Tackling, instincts, run defense",concern:"Coverage, athleticism"},
  {id:172,rank:172,name:"Derek Parish",pos:"DT",school:"Houston",ht:'6\'3"',wt:295,grade:60,bio:"Houston DT with production against AAC competition.",strengths:"Production, motor",concern:"Competition level"},
  {id:173,rank:173,name:"Niquan Studevent",pos:"WR",school:"Oklahoma State",ht:'6\'3"',wt:212,grade:60,bio:"Oklahoma State WR with good size and contested-catch ability.",strengths:"Size, contested catches",concern:"Separation, route tree"},
  {id:174,rank:174,name:"Jaylen Moody",pos:"LB",school:"Alabama",ht:'6\'1"',wt:232,grade:60,bio:"Alabama LB with solid fundamentals and leadership.",strengths:"Fundamentals, leadership",concern:"Athleticism, coverage"},
  {id:175,rank:175,name:"Jake Moretti",pos:"OT",school:"Michigan State",ht:'6\'6"',wt:310,grade:59,bio:"Michigan State OT with good size. Development tackle with NFL frame.",strengths:"Size, frame",concern:"Technique, athleticism"},
  {id:176,rank:176,name:"Kyle Tucker",pos:"WR",school:"Tulsa",ht:'6\'2"',wt:198,grade:59,bio:"Tulsa receiver who was productive in AAC competition.",strengths:"Production, route running",concern:"Competition level"},
  {id:177,rank:177,name:"Tahveon Nicholson",pos:"CB",school:"Illinois",ht:'6\'0"',wt:188,grade:59,bio:"Illinois corner with good ball skills and zone coverage ability.",strengths:"Ball skills, zone",concern:"Press physicality, experience"},
  {id:178,rank:178,name:"Devon Campbell",pos:"OG",school:"Texas",ht:'6\'4"',wt:335,grade:59,bio:"Texas interior OL with massive size and power.",strengths:"Size, power, anchor",concern:"Athleticism, technique"},
  {id:179,rank:179,name:"Colby Wooden",pos:"EDGE",school:"Auburn",ht:'6\'4"',wt:255,grade:59,bio:"Auburn edge with solid production and good size.",strengths:"Size, production, motor",concern:"Athleticism, pass rush moves"},
  {id:180,rank:180,name:"Ty Fryfogle",pos:"WR",school:"Indiana",ht:'6\'2"',wt:208,grade:58,bio:"Indiana WR who was Mendoza's reliable slot option.",strengths:"Reliability, hands, route running",concern:"Speed, athleticism vs NFL"},
  // Late R6-R7 and UDFA level
  {id:181,rank:181,name:"Brady Cook",pos:"QB",school:"Missouri",ht:'6\'2"',wt:215,grade:57,bio:"Missouri QB with solid mechanics and experience.",strengths:"Mechanics, experience",concern:"Athleticism, arm strength"},
  {id:182,rank:182,name:"Cade Klubnik",pos:"QB",school:"Clemson",ht:'6\'2"',wt:218,grade:57,bio:"Clemson QB with good athleticism and improving accuracy.",strengths:"Athleticism, accuracy improvement",concern:"NFL transition, consistency"},
  {id:183,rank:183,name:"Kyle Grocheck",pos:"C",school:"Penn State",ht:'6\'4"',wt:295,grade:57,bio:"Penn State backup center with good technique and communication.",strengths:"Technique, communication",concern:"Starting experience, athleticism"},
  {id:184,rank:184,name:"Luke Lachey",pos:"TE",school:"Iowa",ht:'6\'5"',wt:255,grade:57,bio:"Iowa TE with good blocking ability and improving receiving.",strengths:"Blocking, size, Iowa pedigree",concern:"Athleticism, receiving upside"},
  {id:185,rank:185,name:"Will Allen",pos:"S",school:"Ohio State",ht:'6\'0"',wt:195,grade:57,bio:"Ohio State safety with solid fundamentals and championship pedigree.",strengths:"Fundamentals, pedigree, communication",concern:"Athleticism, starting experience"},
  {id:186,rank:186,name:"Bralen Trice",pos:"EDGE",school:"Washington",ht:'6\'4"',wt:252,grade:56,bio:"Washington edge with good production and motor.",strengths:"Motor, production",concern:"Athleticism, pass rush moves"},
  {id:187,rank:187,name:"Dae'Vonn Hall",pos:"CB",school:"Boise State",ht:'5\'10"',wt:185,grade:56,bio:"Mountain West corner with good athleticism and ball skills.",strengths:"Athleticism, ball skills",concern:"Competition level, size"},
  {id:188,rank:188,name:"Rasheed Muhammad",pos:"CB",school:"Georgia",ht:'6\'1"',wt:193,grade:56,bio:"Georgia corner with good press coverage and man-to-man ability.",strengths:"Press coverage, physicality",concern:"Zone, experience"},
  {id:189,rank:189,name:"Brant Kuithe",pos:"TE",school:"Utah",ht:'6\'3"',wt:245,grade:56,bio:"Utah TE with good receiving ability when healthy. Injury history.",strengths:"Receiving, hands, versatility",concern:"Injury history"},
  {id:190,rank:190,name:"Marvin Mims Jr.",pos:"WR",school:"Oklahoma",ht:'5\'11"',wt:180,grade:55,bio:"Oklahoma speed receiver with pure acceleration and vertical threat.",strengths:"Speed, vertical threat, separation",concern:"Size, contested catches"},
  {id:191,rank:191,name:"Dylan Laube",pos:"RB",school:"New Hampshire",ht:'5\'11"',wt:205,grade:55,bio:"FCS RB from New Hampshire with elite receiving ability. Potential weapon.",strengths:"Receiving, versatility, hands",concern:"Competition level, power"},
  {id:192,rank:192,name:"Aidan Hutchinson",pos:"EDGE",school:"Michigan",ht:'6\'6"',wt:265,grade:55,bio:"Michigan edge with good size and solid pass rush production.",strengths:"Size, production, motor",concern:"Recovery from injury, athleticism"},
  {id:193,rank:193,name:"Nic Scourton",pos:"EDGE",school:"Texas A&M",ht:'6\'4"',wt:270,grade:55,bio:"Power rusher who led A&M in sacks. Plays 4-3 end or 3-4 OLB.",strengths:"Power, relentlessness, versatility",concern:"Bend, ankle flexibility"},
  {id:194,rank:194,name:"Isaiah Foskey",pos:"EDGE",school:"Notre Dame",ht:'6\'5"',wt:258,grade:55,bio:"Notre Dame edge with good size and reliable production.",strengths:"Size, production, motor",concern:"Athleticism, pass rush ceiling"},
  {id:195,rank:195,name:"C.J. Stokes",pos:"WR",school:"Tennessee",ht:'6\'2"',wt:200,grade:54,bio:"Tennessee receiver with good size and hands.",strengths:"Size, hands",concern:"Route tree, separation"},
  {id:196,rank:196,name:"Josh Conerly Jr.",pos:"OT",school:"Oregon",ht:'6\'5"',wt:303,grade:54,bio:"Athletic Oregon tackle who needs refinement but has excellent upside.",strengths:"Athleticism, pass protection upside",concern:"Technique, power"},
  {id:197,rank:197,name:"Keeanu Benton",pos:"DT",school:"Wisconsin",ht:'6\'4"',wt:305,grade:54,bio:"Wisconsin DT with solid fundamentals and run stopping ability.",strengths:"Run stopping, fundamentals, size",concern:"Pass rush, athleticism"},
  {id:198,rank:198,name:"Cameron Thomas",pos:"EDGE",school:"San Diego State",ht:'6\'5"',wt:260,grade:54,bio:"Mountain West standout with good size and motor.",strengths:"Size, motor, production",concern:"Competition level, athleticism"},
  {id:199,rank:199,name:"Jalen Travis",pos:"OT",school:"Michigan",ht:'6\'5"',wt:312,grade:54,bio:"Michigan OT with solid technique and good size.",strengths:"Technique, size",concern:"Athleticism, consistency"},
  {id:200,rank:200,name:"Duce Robinson",pos:"WR",school:"USC",ht:'6\'4"',wt:200,grade:53,bio:"Tall USC receiver with long arms and high catch radius.",strengths:"Size, catch radius, red zone",concern:"Separation, route running"},
  // R7 / UDFA depth (picks 201-257)
  {id:201,rank:201,name:"Holton Ahlers",pos:"QB",school:"East Carolina",ht:'6\'2"',wt:220,grade:52,bio:"East Carolina QB with solid production and experience.",strengths:"Experience, leadership",concern:"Athleticism, arm strength"},
  {id:202,rank:202,name:"Tommy Doyle",pos:"OT",school:"Miami",ht:'6\'7"',wt:310,grade:52,bio:"Tall OT with NFL frame. Development project.",strengths:"Size, frame",concern:"Technique, athleticism"},
  {id:203,rank:203,name:"Steven Jones",pos:"DT",school:"Alabama",ht:'6\'2"',wt:290,grade:52,bio:"Alabama DT with solid fundamentals and run stopping.",strengths:"Fundamentals, run stopping",concern:"Pass rush, size"},
  {id:204,rank:204,name:"Anthony Bradford",pos:"OG",school:"LSU",ht:'6\'5"',wt:335,grade:52,bio:"Massive LSU interior lineman with power and size.",strengths:"Size, power",concern:"Athleticism, technique"},
  {id:205,rank:205,name:"Terrence Ferguson",pos:"TE",school:"Oregon",ht:'6\'5"',wt:248,grade:52,bio:"Oregon TE with athleticism and developing receiving skills.",strengths:"Athleticism, receiving upside",concern:"Blocking, consistency"},
  {id:206,rank:206,name:"DJ Giddens",pos:"RB",school:"Kansas State",ht:'5\'11"',wt:200,grade:51,bio:"Kansas State RB with good vision and burst through holes.",strengths:"Vision, burst, receiving",concern:"Size, power"},
  {id:207,rank:207,name:"Caden McDonald",pos:"TE",school:"Nebraska",ht:'6\'4"',wt:242,grade:51,bio:"Nebraska TE with solid receiving skills and good athleticism.",strengths:"Receiving, athleticism",concern:"Blocking, experience"},
  {id:208,rank:208,name:"Jacob Fiser",pos:"C",school:"Arkansas",ht:'6\'4"',wt:300,grade:51,bio:"Arkansas center with solid technique and communication.",strengths:"Technique, communication",concern:"Athleticism, power"},
  {id:209,rank:209,name:"Gerald Mincey",pos:"DT",school:"Alabama",ht:'6\'2"',wt:295,grade:50,bio:"Alabama DT with solid run-stopping ability.",strengths:"Run stopping, fundamentals",concern:"Pass rush"},
  {id:210,rank:210,name:"Cameron Ward",pos:"QB",school:"Miami (FL)",ht:'6\'2"',wt:219,grade:50,bio:"Cam Ward — versatile QB with improvisation skills. Transfer from WSU.",strengths:"Arm talent, improvisation",concern:"Pocket consistency, injury history"},
  {id:211,rank:211,name:"Bryce Underwood",pos:"QB",school:"Michigan",ht:'6\'3"',wt:215,grade:50,bio:"Michigan freshman QB with elite recruiting pedigree and raw talent.",strengths:"Raw athleticism, arm strength",concern:"Experience, NFL readiness"},
  {id:212,rank:212,name:"Dezmon Jackson",pos:"RB",school:"Oklahoma",ht:'5\'10"',wt:210,grade:50,bio:"Oklahoma RB with solid production and physical running style.",strengths:"Power, production",concern:"Receiving, top-end speed"},
  {id:213,rank:213,name:"Dontrell Hilliard",pos:"RB",school:"Tulane",ht:'5\'9"',wt:196,grade:50,bio:"Versatile Tulane back who can contribute in all phases.",strengths:"Versatility, receiving",concern:"Size, inside running"},
  {id:214,rank:214,name:"Eddie Kelly Jr.",pos:"OG",school:"Oklahoma",ht:'6\'4"',wt:318,grade:49,bio:"Oklahoma interior OL with solid fundamentals.",strengths:"Fundamentals, size",concern:"Athleticism"},
  {id:215,rank:215,name:"Justin Rogers",pos:"CB",school:"Kentucky",ht:'5\'11"',wt:190,grade:49,bio:"Kentucky corner with physical press coverage and solid tackling.",strengths:"Physicality, press, tackling",concern:"Zone, top-end speed"},
  {id:216,rank:216,name:"Travis Bell",pos:"DT",school:"Kennesaw State",ht:'6\'3"',wt:295,grade:49,bio:"FCS DT with hot motor and good production.",strengths:"Motor, production",concern:"Competition level"},
  {id:217,rank:217,name:"AJ Taylor",pos:"WR",school:"Kansas State",ht:'6\'1"',wt:198,grade:49,bio:"Kansas State WR with solid route running and reliable hands.",strengths:"Route running, hands",concern:"Speed, athleticism"},
  {id:218,rank:218,name:"Anthony Evans III",pos:"WR",school:"Texas",ht:'6\'2"',wt:205,grade:49,bio:"Texas WR with good size and athleticism.",strengths:"Size, athleticism",concern:"Route tree, consistency"},
  {id:219,rank:219,name:"Brock Bowers Jr.",pos:"TE",school:"Georgia",ht:'6\'4"',wt:248,grade:49,bio:"Developmental TE from Georgia with good athleticism.",strengths:"Athleticism, upside",concern:"Experience, polish"},
  {id:220,rank:220,name:"Gabe Hall",pos:"DT",school:"Baylor",ht:'6\'4"',wt:305,grade:48,bio:"Baylor DT with good motor and solid run-stopping ability.",strengths:"Motor, run stopping",concern:"Pass rush, athleticism"},
  {id:221,rank:221,name:"Chase Brown",pos:"RB",school:"Illinois",ht:'5\'10"',wt:208,grade:48,bio:"Illinois RB with elite production and solid receiving ability.",strengths:"Production, receiving, vision",concern:"Speed, size at NFL level"},
  {id:222,rank:222,name:"Keilan Robinson",pos:"RB",school:"Alabama",ht:'5\'8"',wt:185,grade:48,bio:"Speed RB from Alabama with special teams value.",strengths:"Speed, versatility",concern:"Size, power"},
  {id:223,rank:223,name:"Matthew Golden",pos:"WR",school:"Texas",ht:'6\'0"',wt:189,grade:48,bio:"Speed receiver from Texas with crisp route running.",strengths:"Speed, route running, separation",concern:"Frame, contested catches"},
  {id:224,rank:224,name:"Kaden Prather",pos:"WR",school:"West Virginia",ht:'6\'3"',wt:205,grade:47,bio:"West Virginia WR with good size and hands.",strengths:"Size, hands, contested catches",concern:"Separation, speed"},
  {id:225,rank:225,name:"Jaquelin Roy",pos:"DT",school:"LSU",ht:'6\'3"',wt:300,grade:47,bio:"LSU DT with solid fundamentals and run stopping.",strengths:"Fundamentals, run stopping",concern:"Pass rush, athleticism"},
  {id:226,rank:226,name:"Colby Wooden",pos:"EDGE",school:"Auburn",ht:'6\'4"',wt:255,grade:47,bio:"Auburn edge with good size and motor.",strengths:"Size, motor",concern:"Pass rush moves"},
  {id:227,rank:227,name:"Ben Yurosek",pos:"TE",school:"Stanford",ht:'6\'5"',wt:248,grade:47,bio:"Smart, reliable TE from Stanford. Good blocker with receiving upside.",strengths:"Blocking, intelligence",concern:"Athleticism, receiving"},
  {id:228,rank:228,name:"Bo Nix",pos:"QB",school:"Oregon",ht:'6\'2"',wt:213,grade:46,bio:"Oregon QB with experience and solid dual-threat ability.",strengths:"Experience, athleticism",concern:"Consistency, arm strength"},
  {id:229,rank:229,name:"Quentin Johnston",pos:"WR",school:"TCU",ht:'6\'4"',wt:215,grade:46,bio:"Big-bodied TCU receiver with good athleticism and contested catches.",strengths:"Size, athleticism, contested",concern:"Route precision, drops"},
  {id:230,rank:230,name:"Ryan Adams",pos:"OG",school:"Mississippi State",ht:'6\'4"',wt:320,grade:46,bio:"Mississippi State interior OL with good size and power.",strengths:"Size, power",concern:"Technique, athleticism"},
  {id:231,rank:231,name:"Justyn Ross",pos:"WR",school:"Clemson",ht:'6\'4"',wt:210,grade:45,bio:"Tall Clemson receiver with big-play ability.",strengths:"Size, big-play ability",concern:"Injury history, consistency"},
  {id:232,rank:232,name:"Devontez Walker",pos:"WR",school:"North Carolina",ht:'6\'2"',wt:195,grade:45,bio:"North Carolina WR with speed and separation.",strengths:"Speed, separation",concern:"Size, contested catches"},
  {id:233,rank:233,name:"Tyler Van Dyke",pos:"QB",school:"Miami (FL)",ht:'6\'4"',wt:225,grade:44,bio:"Miami QB with good size and arm strength.",strengths:"Size, arm strength",concern:"Accuracy, athleticism"},
  {id:234,rank:234,name:"Tanner McLachlan",pos:"TE",school:"Arizona",ht:'6\'5"',wt:245,grade:44,bio:"Arizona TE development prospect with athleticism.",strengths:"Athleticism, receiving upside",concern:"Blocking, experience"},
  {id:235,rank:235,name:"Christian Mahogany",pos:"OG",school:"Boston College",ht:'6\'4"',wt:325,grade:43,bio:"Boston College OG with good power and solid technique.",strengths:"Power, technique",concern:"Athleticism, consistency"},
  {id:236,rank:236,name:"Eli Holstein",pos:"QB",school:"Pitt",ht:'6\'4"',wt:225,grade:43,bio:"Pitt QB with good size and improving accuracy.",strengths:"Size, arm strength",concern:"Accuracy, athleticism"},
  {id:237,rank:237,name:"Maason Smith",pos:"DT",school:"LSU",ht:'6\'4"',wt:305,grade:43,bio:"LSU DT with good size and motor when healthy.",strengths:"Size, motor",concern:"Injury history"},
  {id:238,rank:238,name:"Cade Mays",pos:"OT",school:"Tennessee",ht:'6\'6"',wt:320,grade:43,bio:"Tennessee OT with good size and solid experience.",strengths:"Size, experience",concern:"Athleticism, technique"},
  {id:239,rank:239,name:"Patrick Paul",pos:"OT",school:"Houston",ht:'6\'7"',wt:320,grade:42,bio:"Houston OT with elite size. Raw with upside.",strengths:"Size, frame, raw upside",concern:"Technique, athleticism"},
  {id:240,rank:240,name:"Darryan Peek",pos:"EDGE",school:"Florida",ht:'6\'3"',wt:250,grade:42,bio:"Florida edge with solid size and production.",strengths:"Size, production",concern:"Athleticism, pass rush"},
  {id:241,rank:241,name:"Jamari Lyons",pos:"DT",school:"Nebraska",ht:'6\'2"',wt:295,grade:41,bio:"Nebraska interior DL with solid run stopping.",strengths:"Run stopping, motor",concern:"Pass rush, athleticism"},
  {id:242,rank:242,name:"Jay Higgins",pos:"LB",school:"Iowa",ht:'6\'1"',wt:229,grade:41,bio:"Iowa LB with great football IQ and leadership. Workhorse.",strengths:"Football IQ, leadership, tackling",concern:"Athleticism, coverage"},
  {id:243,rank:243,name:"Nathan Lemnitzer",pos:"K",school:"Florida State",ht:'6\'1"',wt:185,grade:40,bio:"Accurate Florida State kicker with strong leg.",strengths:"Accuracy, leg strength",concern:"Consistency under pressure"},
  {id:244,rank:244,name:"Charlie Kuhbander",pos:"K",school:"Ohio",ht:'6\'2"',wt:195,grade:40,bio:"Ohio kicker with elite accuracy on long field goals.",strengths:"Long range, accuracy",concern:"Touchback consistency"},
  {id:245,rank:245,name:"Tommy Christakis",pos:"P",school:"Yale",ht:'6\'2"',wt:200,grade:39,bio:"Yale punter with consistent production and strong hang time.",strengths:"Hang time, directional punting",concern:"Coverage team adjustment"},
  {id:246,rank:246,name:"Lou Hedley",pos:"P",school:"Miami (FL)",ht:'6\'4"',wt:210,grade:39,bio:"Australian punter with massive booming leg and excellent hang time.",strengths:"Leg strength, hang time",concern:"Directional punting"},
  {id:247,rank:247,name:"Carter Bradley",pos:"QB",school:"South Alabama",ht:'6\'4"',wt:222,grade:38,bio:"South Alabama QB with solid production in Sun Belt.",strengths:"Production, size, experience",concern:"Competition level"},
  {id:248,rank:248,name:"Javion Cohen",pos:"OG",school:"Alabama",ht:'6\'3"',wt:305,grade:38,bio:"Alabama interior lineman with solid technique.",strengths:"Technique, Alabama pedigree",concern:"Athleticism, power"},
  {id:249,rank:249,name:"Caleb Shudak",pos:"K",school:"Iowa",ht:'5\'11"',wt:185,grade:38,bio:"Iowa kicker with solid accuracy and good clutch performance.",strengths:"Accuracy, clutch kicking",concern:"Leg strength on long range"},
  {id:250,rank:250,name:"Ryan Coll",pos:"LS",school:"Penn State",ht:'6\'2"',wt:235,grade:37,bio:"Penn State long snapper with reliable snapping.",strengths:"Reliability, accuracy",concern:"Athleticism on coverage"},
  {id:251,rank:251,name:"Grant DuBose",pos:"WR",school:"Charlotte",ht:'6\'1"',wt:198,grade:37,bio:"Charlotte WR with solid production in Conference USA.",strengths:"Production, hands",concern:"Competition level"},
  {id:252,rank:252,name:"Reggie Bush Jr.",pos:"RB",school:"USC",ht:'5\'10"',wt:195,grade:36,bio:"Speedy USC back with father's elusiveness. Special teams value.",strengths:"Speed, elusiveness",concern:"Size, power, competition"},
  {id:253,rank:253,name:"Deandre Moore Jr.",pos:"WR",school:"Kansas State",ht:'5\'9"',wt:175,grade:36,bio:"Speed demon WR with return ability and big-play upside.",strengths:"Speed, return ability",concern:"Size, contested catches"},
  {id:254,rank:254,name:"Marcus Freeman",pos:"LB",school:"Penn State",ht:'6\'1"',wt:235,grade:35,bio:"Walk-on to starter Penn State LB story. Smart and physical.",strengths:"Football IQ, physicality",concern:"Athleticism, speed"},
  {id:255,rank:255,name:"Nick Elksnis",pos:"LS",school:"Rutgers",ht:'6\'2"',wt:238,grade:35,bio:"Reliable Rutgers long snapper.",strengths:"Reliability, snapping",concern:"Coverage athleticism"},
  {id:256,rank:256,name:"Sam Leavitt",pos:"QB",school:"Michigan State",ht:'6\'3"',wt:220,grade:34,bio:"Michigan State QB with solid experience and arm strength.",strengths:"Experience, arm strength",concern:"Athleticism, accuracy"},
  {id:257,rank:257,name:"Jayden Higgins",pos:"WR",school:"Iowa State",ht:'6\'4"',wt:215,grade:34,bio:"Physical Iowa State WR with contested catch ability and size.",strengths:"Size, contested catches, red zone",concern:"Separation, route running"},
];

const POS_COLOR={QB:"#ef4444",WR:"#3b82f6",OT:"#10b981",EDGE:"#f59e0b",DT:"#8b5cf6",CB:"#ec4899",S:"#06b6d4",LB:"#84cc16",TE:"#f97316",RB:"#14b8a6",OG:"#10b981",C:"#6b7280",DB:"#06b6d4",K:"#d97706",P:"#d97706",LS:"#9ca3af"};
const normPos=p=>({"LB/Edge":"EDGE","LB/EDGE":"EDGE","IOL":"OG","Edge":"EDGE","G":"OG"}[p]||p);
const gradeLabel=g=>g>=95?"Elite":g>=87?"1st Rd":g>=78?"2nd Rd":g>=68?"Day 2":g>=55?"Day 3":"UDFA";

function aiPick(teamId,drafted){
  const team=NFL_TEAMS.find(t=>t.id===teamId);
  if(!team) return null;
  const draftedIds=new Set(drafted.map(d=>d.prospectId));
  const avail=PROSPECTS.filter(p=>!draftedIds.has(p.id));
  if(!avail.length) return null;
  const scored=avail.map(p=>{
    const pos=normPos(p.pos);
    const ni=team.needs.indexOf(pos);
    const boost=ni===0?42:ni===1?30:ni===2?18:ni===3?10:ni===4?5:ni===5?2:0;
    return{p,score:p.grade+boost};
  });
  scored.sort((a,b)=>b.score-a.score);
  return scored[0].p;
}

const G="#c9a227";
const css=`@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800;900&family=Barlow:wght@400;500&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
::-webkit-scrollbar{width:5px;background:#07090e}
::-webkit-scrollbar-thumb{background:#1e2535;border-radius:3px}
select option{background:#111722}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
.aip{animation:pulse 1.2s ease-in-out infinite}`;

function App(){
  const [phase,setPhase]=useState("setup");
  const [myTeams,setMyTeams]=useState(new Set());
  const [draftBoard,setDraftBoard]=useState([]);
  const [currentIdx,setCurrentIdx]=useState(0);
  const [pickOrder,setPickOrder]=useState(FULL_DRAFT_ORDER);
  const [view,setView]=useState("board");
  const [filterPos,setFilterPos]=useState("ALL");
  const [filterRound,setFilterRound]=useState(0); // 0=all
  const [searchQ,setSearchQ]=useState("");
  const [selProspect,setSelProspect]=useState(null);
  const [tradeSrc,setTradeSrc]=useState("");
  const [tradeDst,setTradeDst]=useState("");
  const [tradeSrcIdx,setTradeSrcIdx]=useState(null);
  const [tradeDstIdx,setTradeDstIdx]=useState(null);
  const [tradeMsg,setTradeMsg]=useState("");
  const [aiRunning,setAiRunning]=useState(false);
  const [simming,setSimming]=useState(false);

  const draftedIds=useMemo(()=>new Set(draftBoard.map(d=>d.prospectId)),[draftBoard]);
  const available=useMemo(()=>PROSPECTS.filter(p=>!draftedIds.has(p.id)),[draftedIds]);
  const isDone=currentIdx>=pickOrder.length;
  const currentSlot=!isDone?pickOrder[currentIdx]:null;
  const currentTeamId=currentSlot?.teamId;
  const currentPick=currentSlot?.pick;
  const currentRound=currentSlot?.round;
  const isMyTurn=!isDone&&myTeams.has(currentTeamId);
  const currentTeam=NFL_TEAMS.find(t=>t.id===currentTeamId);

  const remainingAIPicks=useMemo(()=>{
    if(isDone) return 0;
    let count=0;
    for(let i=currentIdx;i<pickOrder.length;i++){
      if(!myTeams.has(pickOrder[i].teamId)) count++;
      else break;
    }
    return count;
  },[pickOrder,currentIdx,myTeams,isDone]);

  const makePick=useCallback((prospect)=>{
    if(!isMyTurn||draftedIds.has(prospect.id)||isDone) return;
    setDraftBoard(prev=>[...prev,{pick:currentPick,round:currentRound,teamId:currentTeamId,prospectId:prospect.id}]);
    setCurrentIdx(p=>p+1);
  },[isMyTurn,draftedIds,isDone,currentPick,currentRound,currentTeamId]);

  // Normal AI (500ms each)
  useEffect(()=>{
    if(phase!=="draft"||isDone||isMyTurn||aiRunning||simming) return;
    setAiRunning(true);
    const pick=aiPick(currentTeamId,draftBoard);
    if(!pick){setAiRunning(false);return;}
    const t=setTimeout(()=>{
      setDraftBoard(prev=>[...prev,{pick:currentPick,round:currentRound,teamId:currentTeamId,prospectId:pick.id}]);
      setCurrentIdx(p=>p+1);
      setAiRunning(false);
    },300);
    return()=>clearTimeout(t);
  },[phase,currentIdx,isMyTurn,aiRunning,isDone,simming]);

  // Sim all AI picks until next human turn
  const simRemaining=useCallback(()=>{
    if(isDone||simming) return;
    setSimming(true);
    let board=[...draftBoard];
    let idx=currentIdx;
    while(idx<pickOrder.length){
      const slot=pickOrder[idx];
      if(myTeams.has(slot.teamId)) break;
      const pick=aiPick(slot.teamId,board);
      if(!pick) break;
      board=[...board,{pick:slot.pick,round:slot.round,teamId:slot.teamId,prospectId:pick.id}];
      idx++;
    }
    setDraftBoard(board);
    setCurrentIdx(idx);
    setSimming(false);
  },[isDone,simming,draftBoard,currentIdx,pickOrder,myTeams]);

  useEffect(()=>{if(isDone&&phase==="draft")setPhase("done");},[isDone,phase]);

  const resetAll=()=>{
    setPhase("setup");setMyTeams(new Set());setDraftBoard([]);setCurrentIdx(0);
    setPickOrder(FULL_DRAFT_ORDER);setView("board");setTradeSrc("");setTradeDst("");
    setTradeSrcIdx(null);setTradeDstIdx(null);setTradeMsg("");setAiRunning(false);setSimming(false);
  };

  const executeTrade=()=>{
    if(tradeSrcIdx===null||tradeDstIdx===null){setTradeMsg("Select a pick from each team.");return;}
    setPickOrder(prev=>{
      const next=[...prev];
      const st=next[tradeSrcIdx].teamId;
      const dt=next[tradeDstIdx].teamId;
      next[tradeSrcIdx]={...next[tradeSrcIdx],teamId:dt,note:(next[tradeSrcIdx].note||"")+" traded"};
      next[tradeDstIdx]={...next[tradeDstIdx],teamId:st,note:(next[tradeDstIdx].note||"")+" traded"};
      return next;
    });
    setTradeMsg(`✅ Trade complete!`);
    setTradeSrcIdx(null);setTradeDstIdx(null);
    setTimeout(()=>setTradeMsg(""),4000);
  };

  const filtered=useMemo(()=>PROSPECTS.filter(p=>{
    const pos=normPos(p.pos);
    const pm=filterPos==="ALL"||pos===filterPos;
    const rm=filterRound===0||(p.rank>=(filterRound-1)*32+1&&p.rank<=filterRound*32);
    const nm=p.name.toLowerCase().includes(searchQ.toLowerCase())||p.school.toLowerCase().includes(searchQ.toLowerCase());
    return pm&&rm&&nm;
  }),[filterPos,filterRound,searchQ]);

  const positions=["ALL","QB","WR","OT","OG","C","TE","RB","EDGE","DT","LB","CB","S","K","P","LS"];

  // Board - group by round for display
  const boardByRound=useMemo(()=>{
    const rounds={};
    pickOrder.forEach(slot=>{
      if(!rounds[slot.round]) rounds[slot.round]=[];
      rounds[slot.round].push(slot);
    });
    return rounds;
  },[pickOrder]);

  const [boardRound,setBoardRound]=useState(1);

  const s={
    app:{minHeight:"100vh",background:"#07090e",color:"#dde2f0",fontFamily:"Barlow,sans-serif"},
    hdr:{background:"#0b0e18",borderBottom:`2px solid ${G}`,padding:"0 14px",display:"flex",alignItems:"center",justifyContent:"space-between",height:52,position:"sticky",top:0,zIndex:100,gap:8},
    logo:{fontFamily:"Barlow Condensed,sans-serif",fontWeight:900,fontSize:18,color:G,letterSpacing:2,textTransform:"uppercase",whiteSpace:"nowrap"},
    main:{maxWidth:1400,margin:"0 auto",padding:"14px 12px"},
    title:{fontFamily:"Barlow Condensed,sans-serif",fontWeight:900,fontSize:24,color:G,letterSpacing:2,textTransform:"uppercase",marginBottom:2},
    sub:{color:"#667799",fontSize:12,marginBottom:14},
    goldBtn:{background:`linear-gradient(135deg,${G},#9e7a16)`,color:"#07090e",border:"none",borderRadius:5,padding:"7px 16px",fontFamily:"Barlow Condensed,sans-serif",fontWeight:800,fontSize:12,letterSpacing:1,cursor:"pointer",textTransform:"uppercase",whiteSpace:"nowrap"},
    simBtn:{background:"linear-gradient(135deg,#3b82f6,#1d4ed8)",color:"#fff",border:"none",borderRadius:5,padding:"7px 16px",fontFamily:"Barlow Condensed,sans-serif",fontWeight:800,fontSize:12,letterSpacing:1,cursor:"pointer",textTransform:"uppercase",whiteSpace:"nowrap"},
    ghostBtn:{background:"transparent",color:"#667799",border:"1px solid #1e2535",borderRadius:5,padding:"5px 12px",fontFamily:"Barlow Condensed,sans-serif",fontWeight:700,fontSize:11,cursor:"pointer"},
    navBtn:(a)=>({background:a?G:"transparent",color:a?"#07090e":"#667799",border:a?"none":"1px solid #1e2535",borderRadius:4,padding:"4px 11px",fontFamily:"Barlow Condensed,sans-serif",fontWeight:700,fontSize:11,letterSpacing:1,cursor:"pointer",textTransform:"uppercase"}),
    card:(hi)=>({background:hi?"rgba(201,162,39,0.09)":"#0f1420",border:`1px solid ${hi?G:"#1a2232"}`,borderRadius:7,padding:"9px 13px",cursor:"pointer",transition:"border-color 0.1s"}),
    badge:(pos)=>({background:POS_COLOR[normPos(pos)]||"#444",color:"#fff",borderRadius:3,padding:"1px 5px",fontSize:9,fontFamily:"Barlow Condensed,sans-serif",fontWeight:700,letterSpacing:0.5,display:"inline-block",whiteSpace:"nowrap"}),
    fbtn:(a)=>({background:a?G:"#0f1420",color:a?"#07090e":"#667799",border:`1px solid ${a?G:"#1a2232"}`,borderRadius:20,padding:"2px 9px",fontSize:9,fontFamily:"Barlow Condensed,sans-serif",fontWeight:700,cursor:"pointer"}),
    input:{background:"#0f1420",border:"1px solid #1a2232",borderRadius:5,padding:"5px 9px",color:"#dde2f0",fontSize:12,outline:"none",flex:1,maxWidth:220},
    sel:{background:"#0f1420",border:"1px solid #1a2232",borderRadius:5,color:"#dde2f0",padding:"6px 9px",fontSize:12,width:"100%",outline:"none"},
    overlay:{position:"fixed",inset:0,background:"rgba(0,0,0,0.9)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:10},
    modal:{background:"#0f1420",border:`2px solid #1a2232`,borderRadius:11,padding:20,maxWidth:480,width:"100%",maxHeight:"92vh",overflowY:"auto",position:"relative"},
    roundTab:(a)=>({background:a?G:"#0b0e18",color:a?"#07090e":"#667799",border:`1px solid ${a?G:"#1a2232"}`,borderRadius:4,padding:"4px 12px",fontFamily:"Barlow Condensed,sans-serif",fontWeight:700,fontSize:11,cursor:"pointer",whiteSpace:"nowrap"}),
  };

  // ─── SETUP ─────────────────────────────────────────────────────────────────
  if(phase==="setup") return(
    <div style={s.app}><style>{css}</style>
      <div style={s.hdr}>
        <div style={s.logo}>🏈 2026 NFL Draft — Full 7 Rounds</div>
        {myTeams.size>0&&<button style={s.goldBtn} onClick={()=>setPhase("draft")}>▶ Start Draft ({myTeams.size} team{myTeams.size>1?"s":""})</button>}
      </div>
      <div style={s.main}>
        <div style={s.title}>Select Your Teams</div>
        <div style={s.sub}>Full 7-round draft · 257 picks · {PROSPECTS.length} prospects. Pick any teams to control — AI handles the rest.</div>
        <div style={{display:"flex",gap:7,marginBottom:14,flexWrap:"wrap"}}>
          <button style={s.goldBtn} onClick={()=>setMyTeams(myTeams.size===32?new Set():new Set(NFL_TEAMS.map(t=>t.id)))}>{myTeams.size===32?"Deselect All":"Select All"}</button>
          {myTeams.size>0&&<><button style={s.ghostBtn} onClick={()=>setMyTeams(new Set())}>Clear</button><button style={s.goldBtn} onClick={()=>setPhase("draft")}>▶ Start Draft</button></>}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))",gap:7}}>
          {NFL_TEAMS.map(t=>{
            const mine=myTeams.has(t.id);
            const r1picks=FULL_DRAFT_ORDER.filter(s=>s.teamId===t.id&&s.round===1).map(s=>`#${s.pick}`);
            const totalPicks=FULL_DRAFT_ORDER.filter(s=>s.teamId===t.id).length;
            return(
              <div key={t.id} style={s.card(mine)} onClick={()=>setMyTeams(p=>{const n=new Set(p);n.has(t.id)?n.delete(t.id):n.add(t.id);return n;})}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <div style={{width:9,height:9,borderRadius:"50%",background:t.color,flexShrink:0}}/>
                  <div style={{fontFamily:"Barlow Condensed,sans-serif",fontWeight:700,fontSize:13,flex:1}}>{t.name}</div>
                  <div style={{color:"#667799",fontSize:10,fontFamily:"Barlow Condensed,sans-serif"}}>{totalPicks}pk</div>
                </div>
                {mine&&<div style={{marginTop:3,color:G,fontSize:9,fontFamily:"Barlow Condensed,sans-serif",fontWeight:700}}>✓ YOU CONTROL</div>}
                <div style={{marginTop:2,fontSize:10,color:"#667799"}}>R1: {r1picks.length?r1picks.join(", "):"No pick"} · Needs: {t.needs.slice(0,2).join("·")}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const doneScreen=phase==="done";
  const boardSlots=boardByRound[boardRound]||[];

  return(
    <div style={s.app}><style>{css}</style>
      <div style={s.hdr}>
        <div style={{display:"flex",alignItems:"center",gap:10,overflow:"hidden",flex:1,minWidth:0}}>
          <div style={s.logo}>🏈 2026 NFL Draft</div>
          {!doneScreen&&isMyTurn&&currentTeam&&(
            <div style={{background:"rgba(201,162,39,0.14)",border:`1px solid ${G}`,borderRadius:4,padding:"2px 8px",fontFamily:"Barlow Condensed,sans-serif",fontWeight:700,fontSize:11,color:G,whiteSpace:"nowrap"}}>
              CLOCK: {currentTeam.abbr} · R{currentRound} #{currentPick}
            </div>
          )}
          {!doneScreen&&!isMyTurn&&!isDone&&(
            <div style={{color:"#667799",fontFamily:"Barlow Condensed,sans-serif",fontSize:11,whiteSpace:"nowrap"}} className={aiRunning||simming?"aip":""}>
              {simming?"⚡ Simming…":aiRunning?`⏳ ${currentTeam?.abbr} selecting…`:`R${currentRound} #${currentPick} · ${currentTeam?.name}`}
            </div>
          )}
          {doneScreen&&<span style={{color:"#22c55e",fontFamily:"Barlow Condensed,sans-serif",fontWeight:700,fontSize:12}}>✅ Draft Complete!</span>}
        </div>
        <div style={{display:"flex",gap:4,alignItems:"center",flexShrink:0,flexWrap:"wrap"}}>
          {!doneScreen&&!isMyTurn&&!isDone&&remainingAIPicks>0&&(
            <button style={s.simBtn} onClick={simRemaining} disabled={simming}>⚡ Sim {remainingAIPicks}</button>
          )}
          {[["board","Board"],["prospects","Big Board"],["trade","Trades"],["results","Results"]].map(([v,l])=>(
            <button key={v} style={s.navBtn(view===v)} onClick={()=>setView(v)}>{l}</button>
          ))}
          <button style={{...s.ghostBtn,fontSize:10,padding:"4px 8px"}} onClick={resetAll}>⟳</button>
        </div>
      </div>

      <div style={s.main}>

        {/* ── DRAFT BOARD ── */}
        {view==="board"&&(
          <>
            <div style={{display:"flex",gap:10,alignItems:"baseline",marginBottom:8,flexWrap:"wrap"}}>
              <div style={s.title}>Draft Board</div>
              <div style={{color:"#667799",fontSize:11}}>{draftBoard.length}/{pickOrder.length} picks · R{currentRound||7} #{currentPick||257}</div>
            </div>
            {/* Round tabs */}
            <div style={{display:"flex",gap:5,marginBottom:12,flexWrap:"wrap"}}>
              {[1,2,3,4,5,6,7].map(r=>(
                <button key={r} style={s.roundTab(boardRound===r)} onClick={()=>setBoardRound(r)}>Round {r}</button>
              ))}
              {isMyTurn&&!doneScreen&&(
                <button style={{...s.goldBtn,marginLeft:"auto"}} onClick={()=>setView("prospects")}>Make Pick →</button>
              )}
            </div>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",minWidth:600}}>
                <thead>
                  <tr style={{background:"#0b0e18",borderBottom:`2px solid ${G}`}}>
                    {["Pick","Team","Player","Pos","School","Grade",""].map((h,i)=>(
                      <th key={i} style={{padding:"6px 9px",textAlign:"left",fontFamily:"Barlow Condensed,sans-serif",fontWeight:700,fontSize:10,color:"#667799",textTransform:"uppercase",letterSpacing:1,whiteSpace:"nowrap"}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {boardSlots.map((slot,si)=>{
                    const gIdx=pickOrder.findIndex(s=>s.pick===slot.pick&&s.round===slot.round);
                    const made=draftBoard.find(d=>d.pick===slot.pick&&d.round===slot.round);
                    const ownTeam=NFL_TEAMS.find(t=>t.id===slot.teamId);
                    const isMine=myTeams.has(slot.teamId);
                    const isNext=gIdx===currentIdx&&!doneScreen;
                    const prospect=made?PROSPECTS.find(p=>p.id===made.prospectId):null;
                    const pos=prospect?normPos(prospect.pos):"";
                    return(
                      <tr key={slot.pick} style={{background:isNext&&isMine?"rgba(201,162,39,0.09)":made&&isMine?"rgba(201,162,39,0.04)":"transparent",borderBottom:"1px solid #0f1520"}}>
                        <td style={{padding:"6px 9px",width:44}}>
                          <div style={{fontFamily:"Barlow Condensed,sans-serif",fontWeight:900,fontSize:15,color:isNext?G:made?"#dde2f0":"#252f42"}}>{slot.pick}</div>
                          {slot.note&&<div style={{fontSize:8,color:"#3a4f66"}}>{slot.note}</div>}
                        </td>
                        <td style={{padding:"6px 9px"}}>
                          {ownTeam&&<div style={{display:"flex",alignItems:"center",gap:5}}>
                            <div style={{width:6,height:6,borderRadius:"50%",background:ownTeam.color,flexShrink:0}}/>
                            <span style={{fontFamily:"Barlow Condensed,sans-serif",fontWeight:700,fontSize:11,color:isMine?G:"#99aabb"}}>{ownTeam.abbr}</span>
                            {isMine&&<span style={{fontSize:8,color:G,fontFamily:"Barlow Condensed,sans-serif"}}>YOU</span>}
                          </div>}
                        </td>
                        <td style={{padding:"6px 9px",minWidth:150}}>
                          {prospect?(
                            <span style={{fontFamily:"Barlow Condensed,sans-serif",fontWeight:700,fontSize:13,color:"#dde2f0",cursor:"pointer"}} onClick={()=>setSelProspect(prospect)}>{prospect.name}</span>
                          ):isNext&&isMine?(
                            <button style={{...s.goldBtn,padding:"3px 10px",fontSize:10}} onClick={()=>setView("prospects")}>Pick →</button>
                          ):isNext?(
                            <span style={{color:"#667799",fontSize:10,fontStyle:"italic"}} className="aip">AI selecting…</span>
                          ):(
                            <span style={{color:"#1a2535",fontSize:10}}>—</span>
                          )}
                        </td>
                        <td style={{padding:"6px 9px"}}>{prospect&&<span style={s.badge(pos)}>{pos}</span>}</td>
                        <td style={{padding:"6px 9px",color:"#667799",fontSize:11}}>{prospect?.school}</td>
                        <td style={{padding:"6px 9px"}}>
                          {prospect&&<span style={{color:prospect.grade>=87?"#22c55e":prospect.grade>=68?"#f59e0b":"#667799",fontFamily:"Barlow Condensed,sans-serif",fontWeight:700,fontSize:12}}>{prospect.grade}</span>}
                        </td>
                        <td style={{padding:"6px 9px",fontSize:9,color:"#667799",whiteSpace:"nowrap"}}>{prospect&&gradeLabel(prospect.grade)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ── BIG BOARD ── */}
        {view==="prospects"&&(
          <>
            <div style={{display:"flex",gap:10,alignItems:"baseline",marginBottom:3,flexWrap:"wrap"}}>
              <div style={s.title}>2026 Big Board</div>
              <div style={{color:"#667799",fontSize:11}}>{available.length}/{PROSPECTS.length} available</div>
            </div>
            {isMyTurn&&!doneScreen&&(
              <div style={{background:"rgba(201,162,39,0.1)",border:`1px solid ${G}`,borderRadius:5,padding:"6px 12px",marginBottom:10,fontSize:11}}>
                <span style={{color:G,fontFamily:"Barlow Condensed,sans-serif",fontWeight:700}}>{currentTeam?.name}</span> — R{currentRound} Pick #{currentPick}. Click <b>Draft</b>.
              </div>
            )}
            <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:10,alignItems:"center"}}>
              {positions.map(p=><button key={p} style={s.fbtn(filterPos===p)} onClick={()=>setFilterPos(p)}>{p}</button>)}
              <div style={{display:"flex",gap:3,marginLeft:6}}>
                <button style={s.fbtn(filterRound===0)} onClick={()=>setFilterRound(0)}>All Rds</button>
                {[1,2,3,4,5,6,7].map(r=><button key={r} style={s.fbtn(filterRound===r)} onClick={()=>setFilterRound(r)}>R{r}</button>)}
              </div>
              <input style={s.input} placeholder="Search…" value={searchQ} onChange={e=>setSearchQ(e.target.value)}/>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(265px,1fr))",gap:8}}>
              {filtered.map(p=>{
                const pos=normPos(p.pos);
                const drafted=draftedIds.has(p.id);
                const whoEntry=drafted?draftBoard.find(d=>d.prospectId===p.id):null;
                const whoTeam=whoEntry?NFL_TEAMS.find(t=>t.id===whoEntry.teamId):null;
                return(
                  <div key={p.id} style={{...s.card(false),opacity:drafted?0.28:1}} onClick={()=>setSelProspect(p)}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                      <span style={{fontFamily:"Barlow Condensed,sans-serif",fontWeight:900,fontSize:19,color:G,lineHeight:1}}>#{p.rank}</span>
                      <span style={s.badge(pos)}>{pos}</span>
                    </div>
                    <div style={{fontFamily:"Barlow Condensed,sans-serif",fontWeight:800,fontSize:14,marginBottom:1}}>{p.name}</div>
                    <div style={{color:"#667799",fontSize:10,marginBottom:4}}>{p.school} · {p.ht} · {p.wt}lbs</div>
                    {drafted&&whoTeam?(
                      <div style={{color:"#3a5070",fontSize:9,fontFamily:"Barlow Condensed,sans-serif",fontWeight:700}}>DRAFTED — {whoTeam.abbr} R{whoEntry.round} #{whoEntry.pick}</div>
                    ):(
                      <>
                        <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                          <span style={{color:p.grade>=87?"#22c55e":p.grade>=68?"#f59e0b":"#667799",fontFamily:"Barlow Condensed,sans-serif",fontWeight:700,fontSize:10}}>{gradeLabel(p.grade)}</span>
                          <span style={{color:"#667799",fontSize:9}}>Grd {p.grade}</span>
                        </div>
                        <div style={{height:2,borderRadius:2,background:`linear-gradient(90deg,${p.grade>=87?"#22c55e":p.grade>=68?"#f59e0b":"#3a4560"} ${p.grade}%,#1a2232 ${p.grade}%)`,marginBottom:5}}/>
                        {isMyTurn&&!doneScreen&&(
                          <button style={{...s.goldBtn,width:"100%",padding:"4px",fontSize:10,marginTop:1}} onClick={e=>{e.stopPropagation();makePick(p);}}>Draft — R{currentRound} #{currentPick}</button>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
              {filtered.length===0&&<div style={{color:"#667799",gridColumn:"1/-1",textAlign:"center",padding:30}}>No prospects match your filter.</div>}
            </div>
          </>
        )}

        {/* ── TRADE CENTER ── */}
        {view==="trade"&&(
          <>
            <div style={s.title}>Trade Center</div>
            <div style={s.sub}>Swap picks between any two teams. Any round, any pick — as long as it hasn't been used yet.</div>
            {tradeMsg&&<div style={{background:"rgba(34,197,94,0.1)",border:"1px solid #22c55e",color:"#22c55e",borderRadius:5,padding:"6px 12px",marginBottom:10,fontSize:11}}>{tradeMsg}</div>}
            <div style={{display:"grid",gridTemplateColumns:"1fr 30px 1fr",gap:10,alignItems:"start",marginBottom:16}}>
              <div>
                <div style={{color:"#667799",fontSize:9,marginBottom:3,textTransform:"uppercase",letterSpacing:1}}>Team A</div>
                <select style={s.sel} value={tradeSrc} onChange={e=>{setTradeSrc(e.target.value);setTradeSrcIdx(null);}}>
                  <option value="">Select…</option>
                  {NFL_TEAMS.map(t=><option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
                {tradeSrc&&(()=>{
                  const slots=pickOrder.map((s,i)=>({...s,i})).filter(s=>s.teamId===tradeSrc&&!draftBoard.find(d=>d.pick===s.pick&&d.round===s.round));
                  return<div style={{marginTop:7,maxHeight:200,overflowY:"auto"}}>
                    {slots.length===0&&<div style={{color:"#445566",fontSize:10,marginTop:5}}>No available picks</div>}
                    {slots.map(slot=>{
                      const sel=tradeSrcIdx===slot.i;
                      return<div key={slot.pick+"-"+slot.round} style={{background:sel?"rgba(201,162,39,0.14)":"#0b0e18",border:`1px solid ${sel?G:"#1a2232"}`,borderRadius:4,padding:"5px 9px",cursor:"pointer",fontFamily:"Barlow Condensed,sans-serif",fontWeight:700,fontSize:11,color:sel?G:"#dde2f0",marginBottom:3}} onClick={()=>setTradeSrcIdx(sel?null:slot.i)}>
                        R{slot.round} #{slot.pick}{slot.note?" ("+slot.note+")":""} {sel?"✓":""}
                      </div>;
                    })}
                  </div>;
                })()}
              </div>
              <div style={{paddingTop:20,color:G,fontFamily:"Barlow Condensed,sans-serif",fontWeight:900,fontSize:18,textAlign:"center"}}>⇄</div>
              <div>
                <div style={{color:"#667799",fontSize:9,marginBottom:3,textTransform:"uppercase",letterSpacing:1}}>Team B</div>
                <select style={s.sel} value={tradeDst} onChange={e=>{setTradeDst(e.target.value);setTradeDstIdx(null);}}>
                  <option value="">Select…</option>
                  {NFL_TEAMS.filter(t=>t.id!==tradeSrc).map(t=><option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
                {tradeDst&&(()=>{
                  const slots=pickOrder.map((s,i)=>({...s,i})).filter(s=>s.teamId===tradeDst&&!draftBoard.find(d=>d.pick===s.pick&&d.round===s.round));
                  return<div style={{marginTop:7,maxHeight:200,overflowY:"auto"}}>
                    {slots.length===0&&<div style={{color:"#445566",fontSize:10,marginTop:5}}>No available picks</div>}
                    {slots.map(slot=>{
                      const sel=tradeDstIdx===slot.i;
                      return<div key={slot.pick+"-"+slot.round} style={{background:sel?"rgba(201,162,39,0.14)":"#0b0e18",border:`1px solid ${sel?G:"#1a2232"}`,borderRadius:4,padding:"5px 9px",cursor:"pointer",fontFamily:"Barlow Condensed,sans-serif",fontWeight:700,fontSize:11,color:sel?G:"#dde2f0",marginBottom:3}} onClick={()=>setTradeDstIdx(sel?null:slot.i)}>
                        R{slot.round} #{slot.pick}{slot.note?" ("+slot.note+")":""} {sel?"✓":""}
                      </div>;
                    })}
                  </div>;
                })()}
              </div>
            </div>
            {tradeSrc&&tradeDst&&tradeSrcIdx!==null&&tradeDstIdx!==null&&(
              <button style={s.goldBtn} onClick={executeTrade}>Execute Trade</button>
            )}
          </>
        )}

        {/* ── RESULTS ── */}
        {view==="results"&&(
          <>
            <div style={s.title}>Draft Results</div>
            <div style={s.sub}>{draftBoard.length} picks made · {PROSPECTS.length-draftBoard.length} prospects undrafted</div>
            {NFL_TEAMS.map(t=>{
              const picks=draftBoard.filter(d=>d.teamId===t.id).sort((a,b)=>a.pick-b.pick);
              if(!picks.length) return null;
              return(
                <div key={t.id} style={{marginBottom:14}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                    <div style={{width:10,height:10,borderRadius:"50%",background:t.color}}/>
                    <span style={{fontFamily:"Barlow Condensed,sans-serif",fontWeight:800,fontSize:16}}>{t.name}</span>
                    {myTeams.has(t.id)&&<span style={{color:G,fontSize:9,fontFamily:"Barlow Condensed,sans-serif",fontWeight:700}}>YOUR TEAM</span>}
                    <span style={{color:"#667799",fontSize:11,marginLeft:4}}>{picks.length} picks</span>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:6}}>
                    {picks.map(d=>{
                      const p=PROSPECTS.find(x=>x.id===d.prospectId);
                      if(!p) return null;
                      const pos=normPos(p.pos);
                      return(
                        <div key={d.pick} style={{background:"#0b0e18",border:"1px solid #1a2232",borderRadius:5,padding:"7px 10px",cursor:"pointer"}} onClick={()=>setSelProspect(p)}>
                          <div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}>
                            <span style={{color:"#667799",fontFamily:"Barlow Condensed,sans-serif",fontSize:10}}>R{d.round} #{d.pick}</span>
                            <span style={s.badge(pos)}>{pos}</span>
                          </div>
                          <div style={{fontFamily:"Barlow Condensed,sans-serif",fontWeight:700,fontSize:13}}>{p.name}</div>
                          <div style={{color:"#667799",fontSize:10}}>{p.school}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>

      {/* ── PROSPECT MODAL ── */}
      {selProspect&&(()=>{
        const p=selProspect;
        const pos=normPos(p.pos);
        const drafted=draftedIds.has(p.id);
        const whoEntry=drafted?draftBoard.find(d=>d.prospectId===p.id):null;
        const whoTeam=whoEntry?NFL_TEAMS.find(t=>t.id===whoEntry.teamId):null;
        return(
          <div style={s.overlay} onClick={()=>setSelProspect(null)}>
            <div style={s.modal} onClick={e=>e.stopPropagation()}>
              <button style={{position:"absolute",top:8,right:10,background:"none",border:"none",color:"#667799",fontSize:17,cursor:"pointer"}} onClick={()=>setSelProspect(null)}>✕</button>
              <div style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:12}}>
                <div style={{background:POS_COLOR[pos]||"#444",borderRadius:6,width:42,height:42,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Barlow Condensed,sans-serif",fontWeight:900,fontSize:12,color:"#fff",flexShrink:0}}>{pos}</div>
                <div>
                  <div style={{fontFamily:"Barlow Condensed,sans-serif",fontWeight:900,fontSize:18}}>{p.name}</div>
                  <div style={{color:"#667799",fontSize:11}}>{p.school}</div>
                  <div style={{marginTop:3,display:"flex",gap:5,alignItems:"center",flexWrap:"wrap"}}>
                    <span style={{color:G,fontFamily:"Barlow Condensed,sans-serif",fontWeight:900,fontSize:15}}>#{p.rank}</span>
                    <span style={s.badge(pos)}>{pos}</span>
                    <span style={{background:"#0b0e18",borderRadius:3,padding:"1px 5px",fontSize:9,color:"#667799"}}>{gradeLabel(p.grade)}</span>
                    {drafted&&<span style={{background:"#ef4444",color:"#fff",borderRadius:3,padding:"1px 5px",fontSize:9,fontFamily:"Barlow Condensed,sans-serif",fontWeight:700}}>
                      {whoTeam?.abbr} R{whoEntry.round} #{whoEntry.pick}
                    </span>}
                  </div>
                </div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:5,marginBottom:10}}>
                {[["Height",p.ht],["Weight",p.wt+"lbs"],["Grade",p.grade],["Rank","#"+p.rank]].map(([k,v])=>(
                  <div key={k} style={{background:"#0b0e18",borderRadius:4,padding:"5px 7px"}}>
                    <div style={{color:"#667799",fontSize:8,textTransform:"uppercase",marginBottom:1}}>{k}</div>
                    <div style={{fontFamily:"Barlow Condensed,sans-serif",fontWeight:700,fontSize:12}}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{marginBottom:9}}>
                <div style={{color:G,fontFamily:"Barlow Condensed,sans-serif",fontWeight:700,fontSize:9,textTransform:"uppercase",letterSpacing:1,marginBottom:3}}>Scout Report</div>
                <div style={{color:"#c0cce0",fontSize:12,lineHeight:1.6}}>{p.bio}</div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:12}}>
                <div style={{background:"#0b0e18",borderRadius:4,padding:7}}>
                  <div style={{color:"#22c55e",fontSize:8,textTransform:"uppercase",marginBottom:3}}>✅ Strengths</div>
                  <div style={{color:"#c0cce0",fontSize:11,lineHeight:1.5}}>{p.strengths}</div>
                </div>
                <div style={{background:"#0b0e18",borderRadius:4,padding:7}}>
                  <div style={{color:"#ef4444",fontSize:8,textTransform:"uppercase",marginBottom:3}}>⚠️ Concerns</div>
                  <div style={{color:"#c0cce0",fontSize:11,lineHeight:1.5}}>{p.concern}</div>
                </div>
              </div>
              {isMyTurn&&!drafted&&!doneScreen&&(
                <button style={{...s.goldBtn,width:"100%"}} onClick={()=>{makePick(p);setSelProspect(null);}}>
                  Draft {p.name} — R{currentRound} #{currentPick}
                </button>
              )}
            </div>
          </div>
        );
      })()}
    </div>
  );
}

import ReactDOM from 'react-dom/client';
ReactDOM.createRoot(document.getElementById('root')).render(
  React.createElement(React.StrictMode, null, React.createElement(App))
);
