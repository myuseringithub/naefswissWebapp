let data = [
    {
        key: 'title', type: 'aggregation', 
        version: ['t1', 't2']
    },
    {
        key: 't2', type: 'version',
        title: {
            short: 'Naef Abu Swiss',
            long: 'Naef Abu Swiss personal site'
        }
    },
    {
        key: 't1', type: 'version',
        title: {
            short: 'نايف أبو صويص',
            long: 'صفحة نايف أبو صويص الشخصية'
        }
    },

    {
        key: 'description', type: 'aggregation', 
        version: ['d1', 'd2']
    },
    {
        key: 'd2', type: 'version',
        description: {
            about: 'CEO & Owner of "Gazit" group, which is specialized in construction, engineering, and capital investment.',
            who: 'Businessman'
        }
    },
    {
        key: 'd1', type: 'version',
        description: {
            about: 'مدير عام وصاحب مجموعة شركات "جازيت" المختصة في مجال البناء والهندسة والاستثمار.',
            who: 'صفحة نايف أبو صويص الشخصية'
        }
    },

]

module.exports = {
    databaseTableName: 'ui',
    data: data,
    index: ['key']
}