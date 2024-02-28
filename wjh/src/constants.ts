export const grundbetrag = 1182
export const familienzuschlag = 414
export const getGrundbetragMitFamilie = (personen : number) : number => {
    return grundbetrag + (personen ?? 0) * familienzuschlag;
}

export const mietobergrenzen = [
  { personen: 1, miete: 849 },
  { personen: 2, miete: 1201 },
  { personen: 3, miete: 1415 },
  { personen: 4, miete: 1726 },
  { personen: 5, miete: 2133 },
  { personen: 6, miete: 2407 }
]
export const getMietobergrenze = (personen : number) => {
    if (personen <= 6) {
      return mietobergrenzen[personen-1];
    } else {
      // letzten Eintrag auswählen und für zusätzliche Personen erhöhen
      const mietobergrenze = mietobergrenzen[5]
      const zusaetzlichePersonen = personen - 6
      mietobergrenze.miete += zusaetzlichePersonen * 310
      return mietobergrenze;
    }
  }