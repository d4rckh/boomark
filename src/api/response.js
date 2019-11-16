class apires {
    constructor(errs = [], result){
        if (!result) errs.push('No results.')

        this.apires = {}
        this.apires.errors = errs
        this.apires.result = result
    }
}

module.exports.apires = apires