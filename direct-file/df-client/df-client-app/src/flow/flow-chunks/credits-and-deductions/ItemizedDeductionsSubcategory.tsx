/* eslint-disable max-len */
import { Gate, Screen, SubSubcategory } from '../../flowDeclarations.js';
import {
  Dollar,
  Heading,
  InfoDisplay,
  SaveAndOrContinueButton,
  SummaryTable,
  ContextHeading,
  DFModal,
} from '../../ContentDeclarations.js';

export const ItemizedDeductionsSubSubcategory = (
  <Gate condition={{ operator: `isFalse`, condition: `/wantsStandardDeduction` }}>
    <SubSubcategory route='itemized-deductions'>
      {/* ─── Medical and Dental Expenses ─── */}
      <Screen route='medical-expenses'>
        <ContextHeading displayOnlyOn='edit' i18nKey='/heading/credits-and-deductions/itemized-deductions-context' />
        <Heading i18nKey='/heading/credits-and-deductions/itemized-medical' />
        <DFModal i18nKey='/info/credits-and-deductions/itemized-medical-details' />
        <Dollar path='/scheduleA/medicalExpenses' />
        <SaveAndOrContinueButton />
      </Screen>

      {/* ─── Taxes You Paid (SALT) ─── */}
      <Screen route='salt-state-taxes'>
        <ContextHeading displayOnlyOn='edit' i18nKey='/heading/credits-and-deductions/itemized-deductions-context' />
        <Heading i18nKey='/heading/credits-and-deductions/itemized-salt-state' />
        <DFModal i18nKey='/info/credits-and-deductions/itemized-salt-details' />
        <Dollar path='/scheduleA/stateTaxesPaid' />
        <SaveAndOrContinueButton />
      </Screen>
      <Screen route='salt-local-taxes'>
        <ContextHeading displayOnlyOn='edit' i18nKey='/heading/credits-and-deductions/itemized-deductions-context' />
        <Heading i18nKey='/heading/credits-and-deductions/itemized-salt-local' />
        <Dollar path='/scheduleA/localTaxesPaid' />
        <SaveAndOrContinueButton />
      </Screen>
      <Screen route='salt-real-estate'>
        <ContextHeading displayOnlyOn='edit' i18nKey='/heading/credits-and-deductions/itemized-deductions-context' />
        <Heading i18nKey='/heading/credits-and-deductions/itemized-salt-realestate' />
        <Dollar path='/scheduleA/realEstateTaxes' />
        <SaveAndOrContinueButton />
      </Screen>
      <Screen route='salt-personal-property'>
        <ContextHeading displayOnlyOn='edit' i18nKey='/heading/credits-and-deductions/itemized-deductions-context' />
        <Heading i18nKey='/heading/credits-and-deductions/itemized-salt-personal' />
        <Dollar path='/scheduleA/personalPropertyTaxes' />
        <SaveAndOrContinueButton />
      </Screen>

      {/* ─── Interest You Paid ─── */}
      <Screen route='mortgage-interest'>
        <ContextHeading displayOnlyOn='edit' i18nKey='/heading/credits-and-deductions/itemized-deductions-context' />
        <Heading i18nKey='/heading/credits-and-deductions/itemized-mortgage-interest' />
        <DFModal i18nKey='/info/credits-and-deductions/itemized-mortgage-details' />
        <Dollar path='/scheduleA/homeMortgageInterest' />
        <SaveAndOrContinueButton />
      </Screen>
      <Screen route='mortgage-interest-not-reported'>
        <ContextHeading displayOnlyOn='edit' i18nKey='/heading/credits-and-deductions/itemized-deductions-context' />
        <Heading i18nKey='/heading/credits-and-deductions/itemized-mortgage-not-reported' />
        <InfoDisplay i18nKey='/info/credits-and-deductions/itemized-mortgage-not-reported-details' />
        <Dollar path='/scheduleA/homeMortgageInterestNotReported' />
        <SaveAndOrContinueButton />
      </Screen>
      <Screen route='mortgage-insurance'>
        <ContextHeading displayOnlyOn='edit' i18nKey='/heading/credits-and-deductions/itemized-deductions-context' />
        <Heading i18nKey='/heading/credits-and-deductions/itemized-mortgage-insurance' />
        <Dollar path='/scheduleA/mortgageInsurancePremiums' />
        <SaveAndOrContinueButton />
      </Screen>

      {/* ─── Gifts to Charity ─── */}
      <Screen route='charity-cash'>
        <ContextHeading displayOnlyOn='edit' i18nKey='/heading/credits-and-deductions/itemized-deductions-context' />
        <Heading i18nKey='/heading/credits-and-deductions/itemized-charity-cash' />
        <DFModal i18nKey='/info/credits-and-deductions/itemized-charity-details' />
        <Dollar path='/scheduleA/charityCash' />
        <SaveAndOrContinueButton />
      </Screen>
      <Screen route='charity-noncash'>
        <ContextHeading displayOnlyOn='edit' i18nKey='/heading/credits-and-deductions/itemized-deductions-context' />
        <Heading i18nKey='/heading/credits-and-deductions/itemized-charity-noncash' />
        <Dollar path='/scheduleA/charityNonCash' />
        <SaveAndOrContinueButton />
      </Screen>
      <Screen route='charity-carryover'>
        <ContextHeading displayOnlyOn='edit' i18nKey='/heading/credits-and-deductions/itemized-deductions-context' />
        <Heading i18nKey='/heading/credits-and-deductions/itemized-charity-carryover' />
        <InfoDisplay i18nKey='/info/credits-and-deductions/itemized-charity-carryover-details' />
        <Dollar path='/scheduleA/charityCarryover' />
        <SaveAndOrContinueButton />
      </Screen>

      {/* ─── Other Itemized Deductions ─── */}
      <Screen route='other-deductions'>
        <ContextHeading displayOnlyOn='edit' i18nKey='/heading/credits-and-deductions/itemized-deductions-context' />
        <Heading i18nKey='/heading/credits-and-deductions/itemized-other' />
        <DFModal i18nKey='/info/credits-and-deductions/itemized-other-details' />
        <Dollar path='/scheduleA/otherItemizedDeductions' />
        <SaveAndOrContinueButton />
      </Screen>

      {/* ─── Itemized Deductions Summary ─── */}
      <Screen route='itemized-summary'>
        <ContextHeading displayOnlyOn='edit' i18nKey='/heading/credits-and-deductions/itemized-deductions-context' />
        <Heading i18nKey='/heading/credits-and-deductions/itemized-summary' />
        <SummaryTable
          i18nKey='/info/credits-and-deductions/itemized-summary'
          items={[
            { itemKey: `medical` },
            { itemKey: `salt` },
            { itemKey: `interest` },
            { itemKey: `charity` },
            { itemKey: `other` },
            { itemKey: `total`, showTopBorder: true },
          ]}
        />
        <SaveAndOrContinueButton />
      </Screen>
    </SubSubcategory>
  </Gate>
);
