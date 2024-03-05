import { describe, it, expect } from 'vitest'

import { mount, config } from '@vue/test-utils'
import WjhEingabe from '../WjhEingabe.vue'

config.global.mocks = {
  $t: (tKey: any) => tKey,
};

describe('WjhEingabe', () => {
  it('Berechnung mit allen Eingaben ist korrekt', async () => {
    const wrapper = mount(WjhEingabe, { props: {
      modelValue: {
        familieneinkommen: 5000,
        personenImHaushalt: 3,
        miete: 2000,
        groesseWohnung: 100,
        kitaKosten: 1000,
        kitaKostenGeschwister: 1000
      }
    }})
    expect(wrapper.vm.grundbetragMitFamilie).toEqual(2010)
    expect(wrapper.vm.mietobergrenze).toEqual(1415)
    expect(wrapper.vm.nebenkostenWohnung).toEqual(120)
    expect(wrapper.vm.mieteMitObergrenze).toEqual(1415)
    expect(wrapper.vm.verwendeteMiete).toEqual(1535)
    expect(wrapper.vm.einkommensgrenze).toEqual(3545)
    expect(wrapper.vm.uebersteigendesEinkommen).toEqual(1455)
    expect(wrapper.vm.uebersteigendesEinkommenMinusGeschwister).toEqual(455)
    expect(wrapper.vm.eigenanteil).toEqual(137)
    expect(wrapper.vm.nichtGefoerderterBetrag).toEqual(137)
    expect(wrapper.vm.foerderung).toEqual(863)
    expect(wrapper.vm.grundbetragAusreichend).toEqual(false)
    expect(wrapper.vm.volleFoerderung).toEqual(false)
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
    expect(wrapper.vm.grundbetragMitFamilie).toEqual(2010)
    expect(wrapper.vm.mietobergrenze).toEqual(1415)
    expect(wrapper.vm.nebenkostenWohnung).toEqual(0)
    expect(wrapper.vm.mieteMitObergrenze).toEqual(0)
    expect(wrapper.vm.verwendeteMiete).toEqual(0)
    expect(wrapper.vm.einkommensgrenze).toEqual(2010)
    expect(wrapper.vm.uebersteigendesEinkommen).toEqual(0)
    expect(wrapper.vm.uebersteigendesEinkommenMinusGeschwister).toEqual(0)
    expect(wrapper.vm.eigenanteil).toEqual(0)
    expect(wrapper.vm.nichtGefoerderterBetrag).toEqual(0)
    expect(wrapper.vm.foerderung).toEqual(1000)
    expect(wrapper.vm.grundbetragAusreichend).toEqual(true)
    expect(wrapper.vm.volleFoerderung).toEqual(true)
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
    expect(wrapper.vm.grundbetragMitFamilie).toEqual(2424)
    expect(wrapper.vm.mietobergrenze).toEqual(1726)
    expect(wrapper.vm.nebenkostenWohnung).toEqual(60)
    expect(wrapper.vm.mieteMitObergrenze).toEqual(1000)
    expect(wrapper.vm.verwendeteMiete).toEqual(1060)
    expect(wrapper.vm.einkommensgrenze).toEqual(3484)
    expect(wrapper.vm.uebersteigendesEinkommen).toEqual(0)
    expect(wrapper.vm.uebersteigendesEinkommenMinusGeschwister).toEqual(0)
    expect(wrapper.vm.eigenanteil).toEqual(0)
    expect(wrapper.vm.nichtGefoerderterBetrag).toEqual(0)
    expect(wrapper.vm.foerderung).toEqual(400)
    expect(wrapper.vm.grundbetragAusreichend).toEqual(false)
    expect(wrapper.vm.volleFoerderung).toEqual(true)
  })
})