<template>
  <h1>Komponentenübersicht</h1>
  <v-table fixed-header>
    <thead>
      <tr>
        <th>Komponente</th>
        <th>Vuetify</th>
        <th>Plain HTML</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <a href="https://patternlab.muenchen.space/?p=viewall-elements-buttons" target="_blank">
            Button
          </a>
        </td>
        <td>
          <v-btn>
            Standard
            <svg aria-hidden="true" class="m-button__icon">
              <use xlink:href="#icon-arrow-right"></use>
            </svg>
          </v-btn>
        </td>
        <td>
          <button class="m-button m-button--primary m-button--animated-right">
            <span>Standard</span>
            <svg aria-hidden="true" class="m-button__icon">
              <use xlink:href="#icon-arrow-right"></use>
            </svg>
          </button>
        </td>
      </tr>
      <tr>
        <td>
          <a href="https://patternlab.muenchen.space/?p=viewall-elements-forms" target="_blank">
            Textfield
          </a>
        </td>
        <td>
          <v-text-field
            class="required"
            label="Default Label"
            placeholder="Placeholder"
            hint="Optional helper Text"
          />
        </td>
        <td>
          <div class="m-form-group">
            <label for="example-text-input" class="m-label"
              >Default label<span aria-hidden="true" class="mandatory">*</span
              ><span class="visually-hidden">(erforderlich)</span></label
            >
            <div class="m-input-wrapper">
              <input
                class="m-input"
                type="text"
                id="example-text-input"
                aria-describedby="example-text-input-hint"
                placeholder="Placeholder"
                required
              />
            </div>
            <p class="m-hint" id="example-text-input-hint">Optional helper text</p>
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <a href="https://patternlab.muenchen.space/?p=elements-checkboxes" target="_blank">
            Checkbox
          </a>
        </td>
        <td>
          <v-checkbox label="Checkbox example 1" />
        </td>
        <td>
          <div class="m-checkboxes__item">
            <input
              class="m-checkboxes__input"
              id="checkbox-example-2"
              name="checkbox-example"
              type="checkbox"
              value="checkbox-value-2"
            />
            <label class="m-label m-checkboxes__label" for="checkbox-example-2">
              Checkbox example 1
            </label>
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <a href="https://patternlab.muenchen.space/?p=elements-radios" target="_blank">
            Radio-Group
          </a>
        </td>
        <td>
          <v-radio-group model-value="1">
            <v-radio value="1">
              <template v-slot:label>
                <div>
                  <span>Radio option 1</span><br />
                  <span class="text-sm-body-2">Optional helper text</span>
                </div>
              </template>
            </v-radio>
            <v-radio label="Radio option 2" value="2" />
            <v-radio label="Radio option 3" value="3" />
          </v-radio-group>
        </td>
        <td>
          <div class="m-form-group">
            <fieldset class="m-radio-group">
              <div class="m-radios">
                <div class="m-radios__item">
                  <input
                    class="m-radios__input"
                    id="radio-button-example-0"
                    name="radio-button-example"
                    type="radio"
                    value="radio-value-0"
                  />
                  <label class="m-label m-radios__label" for="radio-button-example-0">
                    Radio option 1
                    <span class="m-hint" id="example-text-input-with-error-hint-0"
                      >Optional helper text.</span
                    >
                  </label>
                </div>
                <div class="m-radios__item">
                  <input
                    class="m-radios__input"
                    id="radio-button-example-1"
                    name="radio-button-example"
                    type="radio"
                    value="radio-value-1"
                  />
                  <label class="m-label m-radios__label" for="radio-button-example-1">
                    Radio option 2
                  </label>
                </div>
                <div class="m-radios__item">
                  <input
                    class="m-radios__input"
                    id="radio-button-example-2"
                    name="radio-button-example"
                    type="radio"
                    value="radio-value-2"
                  />
                  <label class="m-label m-radios__label" for="radio-button-example-2">
                    Radio option 3
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
        </td>
      </tr>

      <tr>
        <td>
          <a href="https://patternlab.muenchen.space/?p=elements-radios" target="_blank"> Card </a>
        </td>
        <td>
          <v-card class="mx-auto" max-width="344" variant="outlined">
            <v-card-item>
              <div>
                <div class="text-overline mb-1">OVERLINE</div>
                <div class="text-h6 mb-1">Headline</div>
                <div class="text-caption">Greyhound divisely hello coldly fonwderfully</div>
              </div>
            </v-card-item>

            <v-card-actions>
              <v-btn variant="outlined"> Button </v-btn>
            </v-card-actions>
          </v-card>
        </td>
        <td></td>
      </tr>

      <tr>
        <td>
          <a href="https://patternlab.muenchen.space/?p=elements-radios" target="_blank">
            Expansion panels
          </a>
        </td>
        <td>
          <div>
            <div class="d-flex">
              <v-checkbox v-model="disabled" label="Disabled"></v-checkbox>
            </div>

            <v-expansion-panels v-model="panel" :disabled="disabled" multiple variant="accordion">
              <v-expansion-panel elevation="2">
                <v-expansion-panel-title>Panel 1</v-expansion-panel-title>
                <v-expansion-panel-text> Some content </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel elevation="2">
                <v-expansion-panel-title>Panel 2</v-expansion-panel-title>
                <v-expansion-panel-text> Some content </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel elevation="2">
                <v-expansion-panel-title>Panel 3</v-expansion-panel-title>
                <v-expansion-panel-text> Some content </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
        </td>
        <td></td>
      </tr>
    </tbody>
  </v-table>
</template>

<style scoped>
td {
  padding: 16px !important;
  text-align: left;
}
</style>

<script lang="ts">
export default {
  data: () => ({
    panel: [0, 1],
    disabled: false
  })
}
</script>
