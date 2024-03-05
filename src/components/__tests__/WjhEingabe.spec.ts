import { describe, it, expect } from 'vitest'

import { mount, config } from '@vue/test-utils'
import WjhEingabe from '../WjhEingabe.vue'

config.global.mocks = {
  $t: (tKey: any) => tKey,
};

describe('WjhEingabe', () => {
  it('Berechnung mit allen Eingaben ist korrekt', async () => {
    const wrapper = mount<typeof WjhEingabe>(WjhEingabe, { props: {
      modelValue: {
        familieneinkommen: 5000,
        personenImHaushalt: 3,
        miete: 2000,
        groesseWohnung: 100,
        kitaKosten: 1000,
        kitaKostenGeschwister: 1000
      }
    }})
    const component = wrapper.vm as any
    expect(component.grundbetragMitFamilie).toEqual(2010)
    expect(component.mietobergrenze).toEqual(1415)
    expect(component.nebenkostenWohnung).toEqual(120)
    expect(component.mieteMitObergrenze).toEqual(1415)
    expect(component.verwendeteMiete).toEqual(1535)
    expect(component.einkommensgrenze).toEqual(3545)
    expect(component.uebersteigendesEinkommen).toEqual(1455)
    expect(component.uebersteigendesEinkommenMinusGeschwister).toEqual(455)
    expect(component.eigenanteil).toEqual(137)
    expect(component.nichtGefoerderterBetrag).toEqual(137)
    expect(component.foerderung).toEqual(863)
    expect(component.grundbetragAusreichend).toEqual(false)
    expect(component.volleFoerderung).toEqual(false)
  })

  it('Berechnung mit erstem Schritt ist korrekt', async () => {
    const wrapper = mount(WjhEingabe, { props: {
      modelValue: {
        familieneinkommen: 1000,
        personenImHaushalt: 3,
        miete: 0,
        groesseWohnung: 0,
        kitaKosten: 1000,
        kitaKostenGeschwister: 0
      }
    }})
    const component = wrapper.vm as any
    expect(component.grundbetragMitFamilie).toEqual(2010)
    expect(component.mietobergrenze).toEqual(1415)
    expect(component.nebenkostenWohnung).toEqual(0)
    expect(component.mieteMitObergrenze).toEqual(0)
    expect(component.verwendeteMiete).toEqual(0)
    expect(component.einkommensgrenze).toEqual(2010)
    expect(component.uebersteigendesEinkommen).toEqual(0)
    expect(component.uebersteigendesEinkommenMinusGeschwister).toEqual(0)
    expect(component.eigenanteil).toEqual(0)
    expect(component.nichtGefoerderterBetrag).toEqual(0)
    expect(component.foerderung).toEqual(1000)
    expect(component.grundbetragAusreichend).toEqual(true)
    expect(component.volleFoerderung).toEqual(true)
  })

  it('Berechnung mit ersten beiden Schritten ist korrekt', async () => {
    const wrapper = mount(WjhEingabe, { props: {
      modelValue: {
        familieneinkommen: 3000,
        personenImHaushalt: 4,
        miete: 1000,
        groesseWohnung: 50,
        kitaKosten: 400,
        kitaKostenGeschwister: 0
      }
    }})
    const component = wrapper.vm as any
    expect(component.grundbetragMitFamilie).toEqual(2424)
    expect(component.mietobergrenze).toEqual(1726)
    expect(component.nebenkostenWohnung).toEqual(60)
    expect(component.mieteMitObergrenze).toEqual(1000)
    expect(component.verwendeteMiete).toEqual(1060)
    expect(component.einkommensgrenze).toEqual(3484)
    expect(component.uebersteigendesEinkommen).toEqual(0)
    expect(component.uebersteigendesEinkommenMinusGeschwister).toEqual(0)
    expect(component.eigenanteil).toEqual(0)
    expect(component.nichtGefoerderterBetrag).toEqual(0)
    expect(component.foerderung).toEqual(400)
    expect(component.grundbetragAusreichend).toEqual(false)
    expect(component.volleFoerderung).toEqual(true)
  })
})