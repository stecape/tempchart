

getCollection = (d, gte, lte) => {
  return d
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
}

getMinutely = (d) => {
  return d.reduce((acc, t) =>  {
      let _t = new Date(t[0])
      let year = _t.getFullYear()
      let month = _t.getMonth() + 1
       month = month < 10 ? "0"+month : ""+month
      let day = _t.getDate()
      day = day < 10 ? "0"+day : ""+day
      let hour = _t.getHours()
      hour = hour < 10 ? "0"+hour : ""+hour
      let minute = _t.getMinutes()
      minute = minute < 10 ? "0"+minute : ""+minute
      let date = "" + year + "-" + month + "-" + day + "T" + hour + ":" + minute
      if (!acc[date]) acc[date] = { date: new Date(date).getTime(), data: [], min: null, max: null, average: null }
      acc[date].data = acc[date].data.concat(t[1])
      acc[date].average = parseFloat((acc[date].data.reduce((acc,t) => {return acc = acc + t})/acc[date].data.length).toFixed(1))
      acc[date].min = acc[date].data.sort((a, b) => {return a-b} )[0]
      acc[date].max = acc[date].data.sort((a, b) => {return b-a} )[0]
      return acc
    }, {}
  )
}

getHourly = (d) => {
  return d.reduce((acc, t) =>  {
      let _t = new Date(t[0])
      let year = _t.getFullYear()
      let month = _t.getMonth() + 1
       month = month < 10 ? "0"+month : ""+month
      let day = _t.getDate()
      day = day < 10 ? "0"+day : ""+day
      let hour = _t.getHours()
      hours = hours < 10 ? "0"+hours : ""+hours
      let date = "" + year + "-" + month + "-" + day + "T" + hours + ":" + "00" 
      if (!acc[date]) acc[date] = { date: new Date(date).getTime(), data: [], min: null, max: null, average: null }
      acc[date].data = acc[date].data.concat(t[1])
      acc[date].average = parseFloat((acc[date].data.reduce((acc,t) => {return acc = acc + t})/acc[date].data.length).toFixed(1))
      acc[date].min = acc[date].data.sort((a, b) => {return a-b} )[0]
      acc[date].max = acc[date].data.sort((a, b) => {return b-a} )[0]
      return acc
    }, {}
  )
}

getDaily = (d) => {
  return d.reduce((acc, t) =>  {
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
}

getWeekNumber = (millis) => {
  firstDayOfTheYear = new Date(millis).getFullYear()
  giorniPassatiDallInizioDellAnno = ( (new Date(millis - new Date(firstDayOfTheYear.toString()).getTime())) / 86400000 ) + 1
  //2- => la settimana inizia di lunedì, 1- => la settimana inizia di domenica
  primiGiorniDellAnno = 2-new Date(firstDayOfTheYear.toString()).getDay()
  week = Math.trunc((giorniPassatiDallInizioDellAnno-primiGiorniDellAnno)/7) + 1
  return week
}
getWeekly = (d) => {
  return Object.keys(d).reduce((acc, t) =>  {
      let _t = d[t].date
      let week = new Date(_t).getFullYear()+ "-" + getWeekNumber(_t)
      if (!acc[week]) acc[week] = { date: new Date(_t).getTime(), week: getWeekNumber(_t), data: [], min: null, max: null, average: null }
      acc[week].data = acc[week].data.concat(d[t].average)
      acc[week].average = parseFloat((acc[week].data.reduce((acc,t) => {return acc = acc + t})/acc[week].data.length).toFixed(1))
      acc[week].min = acc[week].data.sort((a, b) => {return a-b} )[0]
      acc[week].max = acc[week].data.sort((a, b) => {return b-a} )[0]
      return acc
    }, {}
  )
}

getMonthly = (d) => {
  return d.reduce((acc, t) =>  {
      let _t = new Date(t[0])
      let year = _t.getFullYear()
      let month = _t.getMonth() + 1
       month = month < 10 ? "0"+month : ""+month
      let date = "" + year + "-" + month + "-01"
      if (!acc[date]) acc[date] = { date: new Date(date).getTime(), data: [], min: null, max: null, average: null }
      acc[date].data = acc[date].data.concat(t[1])
      acc[date].average = parseFloat((acc[date].data.reduce((acc,t) => {return acc = acc + t})/acc[date].data.length).toFixed(1))
      acc[date].min = acc[date].data.sort((a, b) => {return a-b} )[0]
      acc[date].max = acc[date].data.sort((a, b) => {return b-a} )[0]
      return acc
    }, {}
  )
}

getYearly = (d) => {
  return d.reduce((acc, t) =>  {
      let _t = new Date(t[0])
      let year = _t.getFullYear()
      let date = "" + year + "-01-01"
      if (!acc[date]) acc[date] = { date: new Date(date).getTime(), data: [], min: null, max: null, average: null }
      acc[date].data = acc[date].data.concat(t[1])
      acc[date].average = parseFloat((acc[date].data.reduce((acc,t) => {return acc = acc + t})/acc[date].data.length).toFixed(1))
      acc[date].min = acc[date].data.sort((a, b) => {return a-b} )[0]
      acc[date].max = acc[date].data.sort((a, b) => {return b-a} )[0]
      return acc
    }, {}
  )
}

getData = (d, gte, lte, detail) => {
  switch (detail) {
  case "highest":
    return getCollection(d, gte, lte)
  case "minutely":
    return getMinutely(getCollection(d, gte, lte))
  case "hourly":
    return getHourly(getCollection(d, gte, lte))
  case "daily":      
    return getDaily(getCollection(d, gte, lte))
  case "weekly":
    return getWeekly(getDaily(getCollection(d, gte, lte)))
  case "monthly":
    return getMonthly(getCollection(d, gte, lte))
  case "yearly":
    return getYearly(getCollection(d, gte, lte))
  }
}

getSeries = (d) => {
    return Object.keys(d).reduce((acc, t) => {
      return [...acc, [d[t].date, d[t].average]]
    }, [])
}

getRange = (d) => {
    return Object.keys(d).reduce((acc, t) => {
      return [...acc, [d[t].date, d[t].min, d[t].max]]
    }, [])
}

export const getDataSeries = (d, gte, lte, detail) => {
  if (d.length > 0) {
    return getSeries(getData(d, gte, lte, detail))
  }
  return []
}
export const getDataRange = (d, gte, lte, detail) => {
  if (d.length > 0) {
    return getRange(getData(d, gte, lte, detail))
  }
  return []
}