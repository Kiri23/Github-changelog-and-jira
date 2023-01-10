const parseChangelog = require('changelog-parser')

parseChangelog('./CHANGELOG.md').then(data => {
    console.log(data.versions[0].parsed)
    console.log(data.versions[0].version)
    console.log(data.versions[10])
}
    )