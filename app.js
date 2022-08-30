const packages = [{
  priorityLevel: 'express',
  isFragile: false,
  weight: 2,
  to: 'Sir Harrington IV',
  trackingNumber: '1324kjs'
},
{
  priorityLevel: 'standard',
  isFragile: true,
  weight: .5,
  to: 'Master Mercutio',
  trackingNumber: '1325sdk'
},
{
  priorityLevel: 'free',
  isFragile: true,
  weight: .5,
  to: 'Mistress Ravenfeather',
  trackingNumber: 'jffd147'
},
{
  priorityLevel: 'standard',
  isFragile: false,
  weight: 4,
  to: 'B. Robert Brown',
  trackingNumber: 'acdc145'
},
{
  priorityLevel: 'express',
  isFragile: true,
  weight: 6,
  to: 'Chancellor Wallace',
  trackingNumber: ''
},
{
  priorityLevel: 'standard',
  isFragile: false,
  weight: 5,
  to: 'Sarah Sharm',
  trackingNumber: '8081baz'
},
{
  priorityLevel: 'free',
  isFragile: true,
  weight: 12,
  to: 'Tae Lien',
  trackingNumber: 'suz2367'
}]

let filterOptions = ["PL: free", "PL: standard", "PL: express", "Fragile", "Not Fragile"]
let sortOptions = ["Weight", "Recipient", "Tracking Number"]
let findOptions = ["recipient", "trackingNumber"]

// function getFilterOptions() {
//   let keys = Object.keys(packages[0])
//   filterOptions = keys
// }

function filterBy (filter) {
  // console.log("Filtering by: ", filter)
  let filteredArray = []

  switch (filter) {
    case "PL: free":
      filteredArray = packages.filter(package => package.priorityLevel === "free")
      break
    case "PL: standard":
      filteredArray = packages.filter(package => package.priorityLevel === "standard")
      break
    case "PL: express":
      filteredArray = packages.filter(package => package.priorityLevel === "express")
      break
    case "Fragile":
      filteredArray = packages.filter(package => package.isFragile)
      break
    case "Not Fragile":
      filteredArray = packages.filter(package => !package.isFragile)
      break
  }
  
  drawPackages(filteredArray)
}

function sortBy (criteria) {
  console.log("Sorting by: ", criteria)
  let sortedArray = []

  switch (criteria) {
    case "Weight":
      packages.sort(function(a,b) {
        let numA = a.weight
        let numB = b.weight
        return (numA < numB) ? -1 : (numA > numB) ? 1 : 0
      })
      break
    case "Recipient":
      packages.sort(function(a,b) {
        let textA = a.to.toUpperCase()
        let textB = b.to.toUpperCase()
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
      })
      break
    case "Tracking Number":
      packages.sort(function(a,b) {
        let textA = a.trackingNumber.toUpperCase()
        let textB = b.trackingNumber.toUpperCase()
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
      })
      break
  }

  drawPackages(packages)
}

function findByRecipient (event) {
  event.preventDefault()

  let form = event.target
  let recipient = form.recipient.value

  if(recipient.toUpperCase() === "ALL") {
    drawPackages(packages)
    form.reset()
    return
  }
  // console.log(recipient)

  let currentPackages = []  //Array for compatibility with drawPackages

  currentPackages.push(packages.find(package => package.to.toUpperCase() === recipient.toUpperCase()))
  // console.log(currentPackages[0])

  form.reset()
  drawPackages(currentPackages)
}

function findByTrackingNumber (event) {
  event.preventDefault()

  let form = event.target
  let trackingNumber = form.trackingNumber.value

  if(trackingNumber.toUpperCase() === "ALL") {
    drawPackages(packages)
    form.reset()
    return
  }
  // console.log(trackingNumber)

  let currentPackages = []  //Array for compatibility with drawPackages

  currentPackages.push(packages.find(package => package.trackingNumber.toUpperCase() === trackingNumber.toUpperCase()))
  // console.log(currentPackages[0])

  form.reset()
  drawPackages(currentPackages)
}

function drawFilterButtons() {
  let template = ""
  let elementFilters = document.getElementById("filters")


  template += `
  <div class="card-2">
    <span>Filter:   <i class="mdi mdi-arrow-right-bold"></i></span>
  </div>
  `
  for (let i = 0; i < filterOptions.length; i++) {
    template += `<button onclick="filterBy('${filterOptions[i]}')">${filterOptions[i]}</button>`
  }

  elementFilters.innerHTML = template
}

function drawSortButtons () {
  let template = ""
  let elementSorts = document.getElementById("sorts")

  template += `
  <div class="card-2">
    <span>Sort:   <i class="mdi mdi-arrow-right-bold"></i></span>
  </div>
  `
  for (let i = 0; i < sortOptions.length; i++) {
    template += `<button onclick="sortBy('${sortOptions[i]}')">${sortOptions[i]}</button>`
  }

  elementSorts.innerHTML = template
}

function drawPackages (arrayOfPackages) {
  let template = ""
  let elementPackages = document.getElementById("packages")

  arrayOfPackages.forEach(package => template += `
  <div class="card-package d-flex justify-content-center align-items-center">
    <div class="card">
      <section class="row p-2" id="package-info">
        <div class="col-12 d-flex flex-column">
          <span>Priority Level: ${package.priorityLevel}</span>
          <span>Fragile? ${package.isFragile}</span>
          <span>Weight: ${package.weight}</span>
          <span>To: ${package.to}</span>
          <span>Tracking Number: ${package.trackingNumber}</span>
        </div>
      </section>
    </div>
  </div>
  `)
  elementPackages.innerHTML = template
}

/**
 * Properties of a Package

      priorityLevel: 'free',
      isFragile: true,
      weight: 12,
      to: 'Tae Lien',
      trackingNumber: 'suz2367'

 */

// getFilterOptions()
drawFilterButtons()
drawSortButtons()
drawPackages(packages)
