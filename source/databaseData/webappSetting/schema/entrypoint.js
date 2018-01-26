import databaseNestedUnitDataAggregator from 'appscript/utilityFunction/database/databaseNestedUnitDataAggregator.js'
let implementation = 'schema'
let dataArray = ['nestedUnit', 'unit', 'file']

/**
 * {Array of Objects}
 */
export default databaseNestedUnitDataAggregator({
    localPath: __dirname,
    implementation,
    dataArray
})
