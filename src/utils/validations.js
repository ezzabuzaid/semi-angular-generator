function createValidation(validatorsList) {

    return validatorsList.reduce((acc, validation) => {

        acc.push(`Validators.${validation}`);

        return acc;

    }, []);
}

module.exports = { createValidation };