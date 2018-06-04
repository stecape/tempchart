
getWeek = (millis) => {
  firstDayOfTheYear = new Date(millis).getFullYear()
  giorniPassatiDallInizioDellAnno = ( (new Date(millis - new Date(firstDayOfTheYear.toString()).getTime())) / 86400000 ) + 1
  //2- => la settimana inizia di lunedì, 1- => la settimana inizia di domenica
  primiGiorniDellAnno = 2-new Date(firstDayOfTheYear.toString()).getDay()
  week = Math.trunc((giorniPassatiDallInizioDellAnno-primiGiorniDellAnno)/7) + 1
  return week
}

export const getData = (d, gte, lte, detail) => {
	if (d.length > 0) {
	  var _collection = d
	    .reduce((acc,t) => {
	        return acc.concat(t.data)
	      }, [] )
	    .filter(t => {
	        var low = new Date(gte).getTime()
	        var up = new Date(lte).getTime()
	        var comp = (low <= t[0]) && (t[0] <= up)
	        return comp
	      })
	    .sort((a, b) => {
	        return a[0] - b[0]
	      })


    let daily = _collection.reduce((acc, t) =>  {
        let _t = new Date(t[0])
        let year = _t.getFullYear()
        let month = _t.getMonth() + 1
         month = month < 10 ? "0"+month : ""+month
        let day = _t.getDate()
         day = day < 10 ? "0"+day : ""+day
        let date = "" + year + "-" + month + "-" + day
        if (!acc[date]) acc[date] = { date: new Date(date).getTime(), data: [], min: null, max: null, average: null }
        acc[date].data = acc[date].data.concat(t[1])
        acc[date].average = parseFloat((acc[date].data.reduce((acc,t) => {return acc = acc + t})/acc[date].data.length).toFixed(1))
        acc[date].min = acc[date].data.sort((a, b) => {return a-b} )[0]
        acc[date].max = acc[date].data.sort((a, b) => {return b-a} )[0]
        return acc
      }, {}
    )
    var _daily = Object.keys(daily).reduce((acc, t) => {
    	return [...acc, [daily[t].date, daily[t].average]]
    }, [])


	  let weekly = Object.keys(daily).reduce((acc, t) =>  {
		    let _t = daily[t].date
		    let week = new Date(_t).getFullYear()+ "-" + getWeek(_t)
		    if (!acc[week]) acc[week] = { date: new Date(_t).getTime(), week: getWeek(_t), data: [], min: null, max: null, average: null }
		    acc[week].data = acc[week].data.concat(daily[t].average)
		    acc[week].average = parseFloat((acc[week].data.reduce((acc,t) => {return acc = acc + t})/acc[week].data.length).toFixed(1))
		    acc[week].min = acc[week].data.sort((a, b) => {return a-b} )[0]
		    acc[week].max = acc[week].data.sort((a, b) => {return b-a} )[0]
		    return acc
		  }, {}
		)
    var _weekly = Object.keys(weekly).reduce((acc, t) => {
    	return [...acc, [weekly[t].date, weekly[t].average]]
    }, [])

    switch (detail) {
    	case "high":
    		return	_collection
    	case "medium":
    		return _daily
    	case "low": 
    		return _weekly
    }
  }

  return []
}