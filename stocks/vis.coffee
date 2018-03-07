
root = exports ? this

`function sigFigs(n, sig) {
    var mult = Math.pow(10,
        sig - Math.floor(Math.log(n) / Math.LN10) - 1);
    return Math.round(n * mult) / mult;
}`
# sigFigs = (n, sig) ->
#   mult = Math.pow(10, sig - Math.floor(Math.log(n) / Math.LN10) - 1)
#   Math.round(n * mult / mult)

formatKey = (key) ->
  # StdDev.Sharpe..Rf.0.3...p.95..."
  # key = key.replace(/(.*)\.\.(\w+)\.(\d\.\d)\.\.\.(\w+)\.(\d+)\.\.\./, "$1 ($2:$3) ($4:$5)")
  key = key.replace(/(.*)\.\.(\w+)\.(\d\.\d)\.\.\.(\w+)\.(\d+)\.\.\./, "$1")
  # Sortino.Ratio..MAR...0..
  key = key.replace(/(.*)\.\.(\w+)\.\.\.(\d+)\.\./, "$1")
  # key = key.replace(/(.*)\.\.(\w+)/, "$1 ($2)")
  key = key.replace(/(.*)\.\.(\w+)/, "$1")
  key = key.replace(/(.*)_$/, "$1")
  key = key.replace(".", " ")
  key = key.replace("_", " ")
  key = key.replace("_", " ")
  key = key.replace(/\w\S*/g, (txt) -> txt.charAt(0).toUpperCase() + txt.substr(1))
  key

# all this terribleness cause of the way i'm getting it out of R
# isn't there a better way?
nestData = (rawData, descriptions) ->
  allData = []
  rawData.forEach (d) ->
    mD = d3.map(d)
    parsedData = {}
    mD.forEach (k,v) ->
      key_values = k.split(":")
      if key_values.length > 1
        time = key_values[0]
        name = key_values[1]
      else
        time = "extra"
        name = key_values[0]
      value = v
      if !(name == "name") and !(name == "group")
        value = +parseFloat(v).toFixed(3)
      if !(parsedData[time])
        parsedData[time] = {}
      parsedData[time][name] = value
    ticker = parsedData["extra"]["name"]
    desc_data = descriptions[ticker]
    parsedData["extra"]["desc"] = desc_data["desc"]
    parsedData["extra"]["full_name"] = desc_data["name"]
    allData.push(parsedData)
  allData

getExtents = (data) ->
  keys = getNestedKeys(data[0])
  extents = {}
  d3.map(keys).forEach (domain, keys) ->
    if true
      extents[domain] = {}
      keys.forEach (key) ->
        extent = d3.extent(data, (d) -> d[domain][key])
        extents[domain][key] = extent
  extents

getScales = (extents) ->
  scales = {}
  d3.map(extents).forEach (domain, value) ->
    scales[domain] = {}
    d3.map(value).keys().forEach (key) ->
      if (key == "name") or (key == "group")# or (domain == "extra")
        aaaa = 1
      else
        scales[domain][key] = d3.scale.linear().domain(extents[domain][key]).range([0,100])
  scales

getNestedKeys = (obj) ->
  keys = {}
  d3.map(obj).forEach (k,v) ->
    keys[k] = d3.map(v).keys()
  keys

Desc = () ->
  allData = []
  div = null
  extents = {}
  scales = {}
  titles = {}

  getTitles = () ->
    t = {"extra":["name", "full_name", "desc"], "time":["Tracking.Error..SPY", "Beta..SPY", "StdDev.Sharpe..Rf.0.3...p.95...", "Treynor.Ratio..SPY", "Sortino.Ratio..MAR...0..", "Information.Ratio..SPY"]}
    t

  getData = (allData, titles) ->
    data = []
    times = d3.map(allData[0]).keys().filter((t) -> t != "extra")
    allData.forEach (d) ->
      datum = {}
      d3.map(titles).forEach (domain, keys) ->
        if domain == "time"
          times.forEach (t) ->
            datum[t] = {}
            keys.forEach (k) ->
              datum[t][k] = d[t][k]
        else
          datum[domain] = {}
          keys.forEach (k) ->
            datum[domain][k] = d[domain][k]
      data.push(datum)
    data


  chart = (selection) ->
    selection.each (rawData) ->
      allData = rawData
      titles = getTitles()
      extents = getExtents(allData)
      scales = getScales(extents)

      div = d3.select(this)
      update()

  createGraph = (section) ->
    section.each (d,i) ->
      parent = d3.select(this.parentNode).datum()
      d.scale = scales[parent.time][d.key]

    svg = section.append("svg").attr("width", 140).attr("height", 40)
    svg.append("rect")
      .attr("fill", "none")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 140)
      .attr("height", 40)
      .attr("pointer-events", "all")
      .on "mouseover", (d) ->
        d3.select(this.parentNode).selectAll(".sub")
          .data(d.scale.domain())
          .enter().append("text")
          .attr("class", "sub")
          .attr("x", (d,i) -> if i == 0 then 20 else 120)
          .attr("y", 30)
          .attr("text-anchor", "middle")
          .attr("font-size", 10)
          .text((d) -> d)
      .on "mouseout", (d) ->
        d3.select(this.parentNode).selectAll(".sub").remove()
    svg.append("line")
      .attr("x1", 20)
      .attr("pointer-events", "none")
      .attr("x2", 120)
      .attr("y1", 40 / 2)
      .attr("y2", 40 / 2)
      .attr("fill", "none")
      .attr("stroke", "#888")
      .attr("stroke-width", 2)
    c = svg.append("circle")
      .attr "cx", (d) ->
        if d.scale
          d.scale(d.value) + 20
        else
          -20
      .attr("cy", 40 / 2)
      .attr("r", 6)
      .attr("pointer-events", "none")
      .attr("fill", "#777")
    # yearsSection.each

  update = () ->
    data = getData(allData, titles)
    stock = div.selectAll(".stock").data(data)
    stockE = stock.enter().append("div").attr("class", "stock")
    stockE.append("h2").html((d) -> d.extra.name + " - " + "<span class='full_name'>" +  d.extra.full_name + "</span>")

    section = stockE.selectAll(".section").data((d) -> d3.map(extents).keys().map((e) -> d[e])).enter()
      .append("div").attr("class", "section")


    section.append("h3").text((d,i) -> t = d3.map(extents).keys()[i]; if t == "extra" then "" else t)
    metric = section.selectAll(".metric")
      .data((d) -> d3.map(d).entries()).enter().append("div").attr("class", "metric")

    metric.append("p").html((d) -> "#{formatKey(d.key)}: <span class='metric_value'>#{d.value}</span>")
    section.each (d,i) ->
      d['index'] = i
      d['time'] = d3.map(extents).keys()[i]
      # console.log(d['time'])
    metric.call(createGraph)
    stockE.append("div").attr("class", "clearfix")
    stockE.append("p").attr("class", "description").text((d) -> d.extra.desc)
    stockE.append("div").attr("class", "clearfix")
    # section.append("h3").text((d) -> d)

  return chart

Table = () ->
  width = 800
  height = 600
  secHeight = 40
  allData = []
  titles = []
  titleNames = []
  tableType = "stats"
  scales = []
  extents = []
  table = null
  current_time = "1 year"
  points = null
  xScale = d3.scale.linear().domain([0,10]).range([0,width])
  yScale = d3.scale.linear().domain([0,10]).range([0,height])
  xValue = (d) -> parseFloat(d.x)
  yValue = (d) -> parseFloat(d.y)


  getTitles = () ->
    t = {}
    if tableType == "stats"
      t = {"extra":["name","full_name", "group", "percent_of_portfolio"], "time":["Annualized.Return", "High", "Low", "Worst.Drawdown"]}
    else
      t = {"extra":["name","full_name", "group", "percent_of_portfolio"], "time":["Tracking.Error..SPY", "Beta..SPY", "StdDev.Sharpe..Rf.0.3...p.95...", "Treynor.Ratio..SPY", "Sortino.Ratio..MAR...0..", "Information.Ratio..SPY"]}
    t

  getData = (allData, titles, current_time) ->
    data = []
    titleMap = d3.map(titles)
    allData.forEach (d) ->
      dSub = {}
      titleMap.forEach (key,values) ->
        if key == "time"
          key = current_time
        values.forEach (v) ->
          dSub[v] = d[key][v]
      data.push(dSub)
    data
      
  chart = (selection) ->
    selection.each (rawData) ->

      allData = rawData
      extents = getExtents(allData)
      scales = getScales(extents)
      titles = getTitles()
      d3.map(titles).forEach (k,v) ->
        v.forEach (t) ->
          titleNames = titleNames.concat({"domain":k, "title":t})

      table = d3.select(this).selectAll("table").data([allData])
      tEnter = table.enter().append("table").attr("id","data_table_" + tableType).attr("class", "hover").append("tbody")
      thead = table.append("thead").append("tr").selectAll("th").data(titleNames)
        .enter().append("th").text((d) -> formatKey(d.title))
      points = table.select("tbody")
      update()

  # createGraph = (td) ->
  #   svg = td.filter (d) ->
  #     valid_keys.indexOf(d.key) != -1
  #   .append("span")
  #     .attr("class", "graphic")
  #     .append("svg")
  #     .attr("width", 75)
  #     .attr("height", 25)
  #     .append("rect")
  #     .attr("width", 75)
  #     .attr("height", 25)
  #     .attr("fill", "red")

  createGraph = (td) ->
    valid_keys = ["percent_of_portfolio", "Annualized.Return", "Information.Ratio..SPY"]
    td = td.filter((d) -> valid_keys.indexOf(d.key) != -1)
    span_width = 60
    span_height = 25
    td.each (d,i) ->
      domain = d.domain
      if domain == "time"
        domain = current_time
      d.scale = scales[domain][d.key]
      d.scale.range([0, span_width])

    margin = {top:5, bottom:8, left:10, right:10}
    svg = td.append("span").attr("class", "mini_graph").append("svg")
      .attr("width", span_width + margin.left + margin.right)
      .attr("height", span_height + margin.top + margin.bottom)
    svg.append("rect")
      .attr("fill", "none")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", span_width + margin.left + margin.right)
      .attr("height", span_height + margin.top + margin.bottom)
      .attr("pointer-events", "all")
      .on "mouseover", (d) ->
        d3.select(this.parentNode).select("g").selectAll(".sub")
          .data(d.scale.domain())
          .enter().append("text")
          .attr("class", "sub")
          .attr("x", (d,i) -> if i == 0 then 0 else span_width)
          .attr("y", (span_height / 2) + 8 )
          .attr("dy", 8)
          .attr("text-anchor", (d,i) -> if i == 0 then "start" else "end")
          .attr("font-size", 10)
          .text((d) -> d)
      .on "mouseout", (d) ->
        d3.select(this.parentNode).selectAll(".sub").remove()
    g = svg.append("g")
      .attr("transform", "translate(#{margin.left},#{margin.top})")
    g.append("line")
      .attr("x1", 0)
      .attr("pointer-events", "none")
      .attr("x2", span_width)
      .attr("y1", span_height / 2)
      .attr("y2", span_height / 2)
      .attr("fill", "none")
      .attr("stroke", "#888")
      .attr("stroke-width", 2)
    c = g.append("circle")
      .attr "cx", (d) ->
        if d.scale
          d.scale(d.value)
        else
          -20
      .attr("cy", span_height / 2)
      .attr("r", 4)
      .attr("pointer-events", "none")
      .attr("fill", "#777")

  update = () ->
    data = getData(allData, titles, current_time)
    # console.log(data)
    tr = points.selectAll("tr")
      .data(data)
    trE = tr.enter()
      .append("tr")
    # trE.selectAll("td").data((d) -> titleNames.map((n) -> d[n])).enter()
    #   .append("td")
    tdE = tr.selectAll("td").data((d) -> titleNames.map((n) -> {"domain":n.domain, "key":n.title, "value":d[n.title]} )).enter()
      .append("td")
    # titleNames.forEach (name) ->
    #   trE.append("td")#.text((d) -> d[name])
    td = tr.selectAll("td")
    td.text (d,i) ->
      if d.key == "name" or d.key == "full_name" or d.key == "group"
        d.value
      else
        (+d.value).toFixed(2)
    td.call(createGraph)
    # tr.selectAll("td").each (d,i) -> console.log(d)
    # tr.selectAll("td").each (d,i) -> console.log(d[titleNames[i]])
    

  chart.setTime = (newTime) ->
    current_time = newTime
    update()

  chart.setType = (newType) ->
    tableType = newType

  chart.height = (_) ->
    if !arguments.length
      return height
    height = _
    chart

  chart.width = (_) ->
    if !arguments.length
      return width
    width = _
    chart

  chart.x = (_) ->
    if !arguments.length
      return xValue
    xValue = _
    chart

  chart.y = (_) ->
    if !arguments.length
      return yValue
    yValue = _
    chart

  return chart

Corr = () ->
  allData = []
  names = []
  points = null
  table = null
  color = d3.scale.cubehelix()
    .domain([-1, 0, 1])
    .range([d3.hsl(-40, .6, .3), d3.hsl(60, .6, 1), d3.hsl(160, .6, .3)])
    #.range([d3.hsl(276, .6, 0), d3.hsl(96, .6, 1)])
  chart = (selection) ->
    selection.each (rawData) ->

      allData = rawData
      names = allData.map((d) -> d[""])
      names.unshift("")
      table = d3.select(this).selectAll("table").data([allData])
      tEnter = table.enter().append("table").attr("id","correlation_table").append("tbody")
      thead = table.append("thead").append("tr").selectAll("th").data(names)
        .enter().append("th").text((d) -> formatKey(d))
      points = table.select("tbody")
      update()

  update = () ->
    tr = points.selectAll("tr")
      .data(allData)
    trE = tr.enter()
      .append("tr")
    # trE.selectAll("td").data((d) -> titleNames.map((n) -> d[n])).enter()
    #   .append("td")
    tr.selectAll("td").data((d) -> names.map((n) -> d[n])).enter()
      .append("td")
    # titleNames.forEach (name) ->
    #   trE.append("td")#.text((d) -> d[name])
    tr.selectAll("td").text (d,i) ->
      if i == 0
        d
      else
        parent = d3.select(this.parentNode).datum()
        if i > names.indexOf(parent[""])
          ""
        else
          (+d).toPrecision(2)
    .style "background-color", (d,i) ->
      if i > 0
        color(+d)
      else
        null
    .style "color", (d,i) ->
      if i > 0 and +d == 1.0
        "white"
      else
        null
    .on "mouseover", (d,i) ->
      parent = d3.select(this.parentNode)
      parent.selectAll("td").classed("active", (d,j) -> j == 0)
      d3.select(this).classed("active", true)
      table.selectAll("th")
        .style("color", (d,j) -> if i == j then "red" else null)
    .on "mouseout", (d,i) ->
      parent = d3.select(this.parentNode)
      parent.selectAll("td").classed("active", false)
      # d3.select(this).style("color", null)
      table.selectAll("th")
        .style("color", null)


  return chart

Smalls = () ->
  width = 40
  height = 60
  svg = null
  parseDate = d3.time.format("%b %Y").parse
  margin = {top: 5, right: 10, bottom: 15, left: 2}
  allData = []
  is_hover = true
  xVar = (d) -> d.date

  chartType = "area"
  yScaled = false
  canNest = true

  xScale = d3.time.scale().range([0, width])
  yScale = d3.scale.linear().range([height, 0])
  yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(4).outerTickSize(0)

  area = d3.svg.area()
    .x((d) -> xScale(xVar(d)))
    .y0(height)
    .y1((d) -> yScale(d.price))

  line = d3.svg.line()
    .x((d) -> xScale(xVar(d)))
    .y((d) -> yScale(d.price))
      

  getData = (rawData) ->
    symbols = d3.nest()
      .key((d) -> d.asset.split(".")[0])
      .entries(rawData)
    symbols.forEach (s) ->
      s.values.forEach (d) ->
        d.price = if d.price == "NA" then null else +d.price
        if canNest
          d.date = parseDate(d.date)
      s.maxPrice = d3.max(s.values, (d) -> d.price)
    symbols



  chart = (selection) ->
    selection.each (rawData) ->

      allData = getData(rawData)

      xScale.domain([
        d3.min(allData, (s) -> s.values[0].date)
        d3.max(allData, (s) -> s.values[s.values.length - 1].date)
      ])

      ymax = d3.max(allData.map((s) -> d3.max(s.values, (d) -> d.price)))
      ymin = d3.min(allData.map((s) -> d3.min(s.values, (d) -> d.price)))

      if min > 0
        min = 0
      if ymax <= 0
        area
          .y0(0)
      yScale.domain([ymin, ymax])
      axWidth = 35

      ax = d3.select(this)
        .append("div")
        .attr("class", "axis_section")
        .style("float", "left")
        .style("width", "#{axWidth}px")
        .style("margin-right", "2px")
      dv = d3.select(this)
        .append("div")
        .attr("class", "chart_section")
        .style("float", "left")
      axisG = ax.selectAll("svg").data([allData[0]]).enter()
        .append("svg")
        .attr("width", axWidth)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + axWidth + ",#{margin.top})")
      if !yScaled
        axisG.call(yAxis)

      svg = dv.selectAll("svg").data(allData).enter()
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("class", (d) -> d.key + " " + "small_mult")
        .append("g")
        .attr("class", "transformed")
        .attr("transform", "translate(#{margin.left},#{margin.top})")
      svg.insert("rect", ".transformed")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .style("pointer-events", "all")
        .style("fill", "none")
        .on "mouseover", (d,i) ->
          d3.select("#small_mults").selectAll(".#{d.key}")
            .classed("highlight", true)
        .on "mouseout", (d,i) ->
          d3.select("#small_mults").selectAll(".#{d.key}")
            .classed("highlight", false)
      

      path = null
      if chartType == "area"
        path = svg.append("path")
          .attr("class", "area")
          .style("pointer-events", "none")
          .attr "d", (d) ->
            if yScaled
              yScale.domain([0, d.maxPrice])
            area(d.values)#.filter((v) -> v.price != null))
      else
        path = svg.append("path")
          .attr("class", "line")
          .style("pointer-events", "none")
          .attr("d", (d) -> line(d.values.filter((v) -> v.price != null)))
      # path.on "mouseover", (d,i) ->
      #   console.log(d.key)
      # path.on "mouseover", (d,i) ->
      #     # yScale.domain([0, d.maxPrice])
      #     parent = d3.select(this.parentNode)
      #     parent.append("text")
      #       .attr("class", "hover_text")
      #       .attr("text-anchor", "start")
      #       .style("font-size", "10px")
      #       .attr("x", xScale(d.values[0].date))
      #       .attr("y", yScale(d.values[0].price))
      #       .text(d.values[0].price)
      #     parent.append("text")
      #       .attr("class", "hover_text")
      #       .attr("text-anchor", "end")
      #       .style("font-size", "10px")
      #       .attr("x", xScale(d.values[d.values.length - 1].date))
      #       .attr("y", yScale(d.values[d.values.length - 1].price))
      #       .text(d.values[d.values.length - 1].price)
      #     parent.selectAll(".date_bottom").style("fill", "black")
      #   .on "mouseout", (d,i) ->
      #     d3.select(this.parentNode).selectAll(".hover_text").remove()
      #     d3.select(this.parentNode).selectAll(".date_bottom")
      #       .style("fill", (d) -> if i > 0 then "#cec6b9" else "black")


      svg.append("text")
        .attr("text-anchor", "middle")
        .attr("x", width / 2)
        .attr("y", (height + margin.bottom + margin.top) - 8)
        .style("font-size", "11px")
        .text((d) -> d.key.split(".")[0])

      svg.append("text")
        .attr("class", "date_bottom")
        .attr("text-anchor", "start")
        .attr("x", 1)
        .attr("y", height - 3)
        .text((d,i) -> if i > 0 then null else d.values[0].date.getFullYear().toString().replace("20","'"))
        .style("fill", (d,i) -> if i > 0 then "#cec6b9" else "black")
        .style("font-size", "10px")
      svg.append("text")
        .attr("class", "date_bottom")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height - 3)
        .text((d,i) -> if i > 0 then null else d.values[d.values.length - 1].date.getFullYear().toString().replace("20","'"))
        .style("fill", (d,i) -> if i > 0 then "#cec6b9" else "black")
        .style("font-size", "10px")

  chart.type = (newType) ->
    chartType = newType
    return chart

  chart.scaleY = (shouldScale) ->
    yScaled = shouldScale
    return chart

  chart.canNest = (shouldNest) ->
    canNest = shouldNest
    return chart


  return chart

root.Table = Table

root.plotData = (selector, data, plot) ->
  d3.select(selector)
    .datum(data)
    .call(plot)

activate = (group, link) ->
  d3.selectAll("##{group} a").classed("active", false)
  d3.select("##{group} ##{link}").classed("active", true)

$ ->

  plot = Table()
  ratios = Table()
  ratios.setType("ratios")
  desc = Desc()
  corrs = Corr()

  priceScaledGraph = Smalls()
  priceScaledGraph.scaleY(true)
  # priceScaledGraph.canNest(false)
  retGraph = Smalls()
  priceGraph = Smalls()
  drawdownGraph = Smalls()
  corrsGraph = Smalls()
  corrsGraph.type("line")
  betaGraph = Smalls()
  betaGraph.type("line")
  display = (error, rdata, descriptions, correlations, prices) ->
    data = nestData(rdata, descriptions)

    plotData("#stats_table", data, plot)
    plotData("#ratios_table", data, ratios)
    #plotData("#desc", data, desc)
    plotData("#corrs", correlations, corrs)
    $('#data_table_stats').DataTable({paging:false, "order": [[ 3, "desc" ]]})
    $('#data_table_ratios').DataTable({paging:false, "order": [[ 3, "desc" ]]})

  displayGraphs = (error, prices, pricesagain, returns, drawdowns, correlations, betas) ->
    plotData("#small_prices", prices, priceGraph)
    plotData("#small_prices_scaled", pricesagain, priceScaledGraph)
    plotData("#small_returns", returns, retGraph)
    plotData("#small_draws", drawdowns, drawdownGraph)
    plotData("#small_corrs", correlations, corrsGraph)
    betas.forEach((b) -> b.price = if (b.price == "0") then "NA" else b.price)
    plotData("#small_beta", betas, betaGraph)

  queue()
    .defer(d3.tsv, "data/holdings_stats.tsv")
    .defer(d3.json, "data/stock_descriptions.json")
    .defer(d3.tsv, "data/correlation_table.tsv")
    .await(display)

  queue()
    .defer(d3.tsv, "data/month_prices.tsv")
    .defer(d3.tsv, "data/month_prices.tsv")
    .defer(d3.tsv, "data/month_returns.tsv")
    .defer(d3.tsv, "data/month_drawdowns.tsv")
    .defer(d3.tsv, "data/month_correlations.tsv")
    .defer(d3.tsv, "data/month_beta_year_width.tsv")
    .await(displayGraphs)

  d3.selectAll("#time a").on "click", (d) ->
    newTime = d3.select(this).attr("id")
    activate("time", newTime)
    newTimeS = newTime.replace("_", " ").replace("i", "")
    plot.setTime(newTimeS)
    ratios.setTime(newTimeS)
    $('#data_table_stats').dataTable().fnDestroy()
    $('#data_table_stats').DataTable({paging:false, "order": [[ 3, "desc" ]]})
    $('#data_table_ratios').dataTable().fnDestroy()
    $('#data_table_ratios').DataTable({paging:false, "order": [[ 3, "desc" ]]})

  
