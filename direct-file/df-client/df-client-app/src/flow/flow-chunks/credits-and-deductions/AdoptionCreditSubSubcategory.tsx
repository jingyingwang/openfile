/* eslint-disable max-len */
import { Assertion, Gate, Screen, SubSubcategory } from '../../flowDeclarations.js';
import {
  Boolean,
  ContextHeading,
  DFModal,
  Dollar,
  Heading,
  InfoDisplay,
  SaveAndOrContinueButton,
} from '../../ContentDeclarations.js';
import { ItemConfig } from '../../../components/ConditionalList/ConditionalList.js';

export const AdoptionCreditDisqualifyingItems: ItemConfig[] = [
  {
    itemKey: `subListAdoption-noQualifyingAdoption`,
    conditions: [{ operator: `isFalseOrIncomplete`, condition: `/hadQualifyingAdoption` }],
  },
];

export const AdoptionCreditSubSubcategory = (
  <Gate condition='/flowShowAdoptionCreditSection'>
    <SubSubcategory route='adoption-credit' headingLevel='h2' borderStyle='heavy'>
      <Assertion
        type='success'
        i18nKey='dataviews./flow/credits-and-deductions/credits.assertions.adoptionCreditQualified'
        condition='/qualifiedForAdoptionCredit'
      />
      <Screen route='adoption-credit-intro'>
        <ContextHeading
          displayOnlyOn='edit'
          i18nKey='/heading/credits-and-deductions/credits/adoption-credit-context'
        />
        <Heading
          i18nKey='/heading/credits-and-deductions/credits/had-qualifying-adoption'
          condition={{ operator: `isFalse`, condition: `/isFilingStatusMFJ` }}
        />
        <Heading
          i18nKey='/heading/credits-and-deductions/credits/had-qualifying-adoption-mfj'
          condition='/isFilingStatusMFJ'
        />
        <DFModal i18nKey='/info/credits-and-deductions/credits/adoption-credit-details' />
        <Boolean path='/hadQualifyingAdoption' />
        <SaveAndOrContinueButton />
      </Screen>
      <Screen route='adoption-credit-children' condition='/hadQualifyingAdoption'>
        <ContextHeading
          displayOnlyOn='edit'
          i18nKey='/heading/credits-and-deductions/credits/adoption-credit-context'
        />
        <Heading i18nKey='/heading/credits-and-deductions/credits/adoption-credit-children' />
        <InfoDisplay i18nKey='/info/credits-and-deductions/credits/adoption-credit-children-details' />
        <Dollar path='/adoptionCreditNumberOfChildren' />
        <SaveAndOrContinueButton />
      </Screen>
      <Screen route='adoption-credit-expenses' condition='/hadQualifyingAdoption'>
        <ContextHeading
          displayOnlyOn='edit'
          i18nKey='/heading/credits-and-deductions/credits/adoption-credit-context'
        />
        <Heading i18nKey='/heading/credits-and-deductions/credits/adoption-credit-expenses' />
        <InfoDisplay i18nKey='/info/credits-and-deductions/credits/adoption-credit-expenses-details' />
        <Dollar path='/adoptionCreditQualifiedExpenses' />
        <SaveAndOrContinueButton />
      </Screen>
    </SubSubcategory>
  </Gate>
);
