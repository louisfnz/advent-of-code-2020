export type Passport = {
    byr?: string,
    iyr?: string,
    eyr?: string,
    hgt?: string,
    hcl?: string,
    ecl?: string,
    pid?: string,
    cid?: string,
};

export const requiredFields = () => [
    'ecl',
    'hcl',
    'eyr',
    'iyr',
    'hgt',
    'byr',
    'pid',
];

export const passportReducer = (passports: Passport[], line: string): Passport[] => {
    if (line === '') return [...passports, {}];
    const parts = line.split(' ');
    parts.forEach(part => {
        let keyValue = part.split(':');
        passports[passports.length-1][keyValue[0] as keyof Passport] = keyValue[1];
    });
    return passports;
};

export const requiredFieldsString = requiredFields().sort().join(',');

export const validYear = (min: number, max: number, value?: string): boolean => {
    if (value && new RegExp('^[0-9]+$').test(value)) {
        const year = Number(value);
        return year >= min && year <= max;
    }
    return false;
}

export const validHeight = (value?: string): boolean => {
    if (value && new RegExp('^[0-9]{2,3}(cm|in)$').test(value)) {
        const unit = value.replace(new RegExp('[0-9]+', 'g'), '');
        const height = Number(value.replace(unit, ''));
        if (unit !== 'cm' && unit !== 'in') return false;
        if (unit === 'cm' && (height < 150 || height > 193)) return false;
        if (unit === 'in' && (height < 59 || height > 76)) return false;
        return true;
    }
    return false;
}

export const validHairColour = (value?: string): boolean => {
    return !!(value && new RegExp('^#[a-f0-9]{6}$').test(value));
}

export const validEyeColour = (value?: string): boolean => {
    return !!(value && ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value));
}

export const validPassportId = (value?: string): boolean => {
    return !!(value && new RegExp('^[0-9]{9}$').test(value));
}

export const checkRequiredPassportFields = (passport: Passport): boolean => {
    const keys = Object.keys(passport).sort();
    const cidIndex = keys.indexOf('cid');
    if (cidIndex !== -1) keys.splice(cidIndex, 1);
    return keys.join(',') === requiredFieldsString;
};

export const checkValidPassportFields = (passport: Passport): boolean => {
    if (!validYear(1920, 2002, passport.byr)) return false;
    if (!validYear(2010, 2020, passport.iyr)) return false;
    if (!validYear(2020, 2030, passport.eyr)) return false;
    if (!validHeight(passport.hgt)) return false;
    if (!validHairColour(passport.hcl)) return false;
    if (!validEyeColour(passport.ecl)) return false;
    if (!validPassportId(passport.pid)) return false;
    return true;
};
