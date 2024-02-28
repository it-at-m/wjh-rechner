export const todoVariable = 'todo-value'

export const grundbetrag = 1182
export const familienzuschlag = 414
export const getGrundbetragMitFamilie = (persons : number) : number => {
    return grundbetrag + (persons ?? 0) * familienzuschlag;
}

export const mietobergrenzen = [
  { persons: 1, area: 50, miete: 849 },
  { persons: 2, area: 65, miete: 1201 },
  { persons: 3, area: 75, miete: 1415 },
  { persons: 4, area: 90, miete: 1726 },
  { persons: 5, area: 105, miete: 2133 },
  { persons: 6, area: 120, miete: 2407 }
]
export const getMietobergrenze = (persons : number) => {
    if (persons <= 6) {
      return mietobergrenzen[persons-1];
    } else {
      // letzten Eintrag auswählen und für zusätzliche Personen erhöhen
      const mietobergrenze = mietobergrenzen[5]
      const additionalPersons = persons - 6
      mietobergrenze.area += additionalPersons * 15
      mietobergrenze.miete += additionalPersons * 310
      return mietobergrenze;
    }
  }