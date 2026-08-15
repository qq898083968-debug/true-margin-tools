
const TMT={
 n:v=>{v=Number(v);return Number.isFinite(v)?v:0}, p:v=>Number(v||0)/100,
 money:v=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:2}).format(v||0),
 fmt:(v,d=2)=>Number.isFinite(v)?Number(v).toFixed(d):'—',
 clamp:(v,a,b)=>Math.min(b,Math.max(a,v)),
 breakEvenCPA(x){let captured=x.price*(1-x.discount),net=captured*(1-x.refundRate),fee=captured*x.feePct+x.fixedFee,creator=captured*x.creatorPct,target=net*x.targetMargin,max=net-x.cogs-x.fulfillment-fee-creator-target;return{captured,net,fee,creator,target,max,roas:max>0?captured/max:Infinity}},
 safeDiscount(x){let fixed=x.cogs+x.fulfillment+x.fixedFee+x.cpa,keep=1-x.feePct-x.creatorPct-x.targetMargin;if(x.price<=0||keep<=0)return{min:NaN,max:NaN};let min=fixed/keep;return{min,max:1-min/x.price}},
 creator(x){let sales=x.price*(1-x.discount);if(sales<=0)return{pct:NaN,dollars:NaN};let dollars=sales-x.cogs-x.fulfillment-sales*x.feePct-x.fixedFee-x.cpa-sales*x.targetMargin;return{pct:dollars/sales,dollars}},
 refund(x){let cogsLost=x.cogs*(1-x.cogsRecovery);return{loss:x.sale+x.outbound+x.returnShip+x.feeLost+cogsLost-x.recovery}},
 shipping(x){if(x.margin<=0)return{threshold:Infinity,current:NaN};return{threshold:(x.shipping+x.target)/x.margin,current:x.aov*x.margin-x.shipping}},
 bundle(x){let list=x.unitPrice*x.units,revenue=list*(1-x.discount),cost=x.unitCost*x.units,fees=revenue*x.feePct+x.fixedFee,profit=revenue-cost-fees-x.shipping;return{list,revenue,profit,margin:revenue?profit/revenue:0,saved:list-revenue}},
 efficiency(x){return{roas:x.spend?x.attributed/x.spend:NaN,mer:x.spend?x.revenue/x.spend:NaN,poas:x.spend?x.preAdProfit/x.spend:NaN,mcr:x.revenue?x.spend/x.revenue:NaN}}
};if(typeof module!=='undefined')module.exports=TMT;
