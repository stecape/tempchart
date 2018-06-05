
getWeekNumber = (millis) => {
  firstDayOfTheYear = new Date(millis).getFullYear()
  giorniPassatiDallInizioDellAnno = ( (new Date(millis - new Date(firstDayOfTheYear.toString()).getTime())) / 86400000 ) + 1
  //2- => la settimana inizia di lunedì, 1- => la settimana inizia di domenica
  primiGiorniDellAnno = 2-new Date(firstDayOfTheYear.toString()).getDay()
  week = Math.trunc((giorniPassatiDallInizioDellAnno-primiGiorniDellAnno)/7) + 1
  return week
}

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

export const getHighDetailRange = (d, gte, lte) => {
  if (d.length > 0) {
    var _collection = getCollection(d, gte, lte)
    return getRange(_collection)
  }
  return []
}

export const getHighDetailSeries = (d, gte, lte) => {
  if (d.length > 0) {
    return getCollection(d, gte, lte)
  }
  return []
}

export const getMediumDetailRange = (d, gte, lte) => {
  if (d.length > 0) {
    var _collection = getCollection(d, gte, lte)
    var daily = getDaily(_collection)
    return getRange(daily)
  }
  return []
}

export const getMediumDetailSeries = (d, gte, lte) => {
  if (d.length > 0) {
    var _collection = getCollection(d, gte, lte)
    var daily = getDaily(_collection)
    return getSeries(daily)
  }
  return []
}

export const getLowDetailRange = (d, gte, lte) => {
  if (d.length > 0) {
    var _collection = getCollection(d, gte, lte)
    var daily = getDaily(_collection)
    var weekly = getWeekly(daily)
    return getRange(weekly)
  }
  return []
}

export const getLowDetailSeries = (d, gte, lte) => {
  if (d.length > 0) {
    var _collection = getCollection(d, gte, lte)
    var daily = getDaily(_collection)
    var weekly = getWeekly(daily)
    return getSeries(weekly)
  }
  return []
}
