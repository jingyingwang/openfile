/* eslint-disable max-len */
import { CollectionLoop, Screen, Subcategory, SubSubcategory } from '../../flowDeclarations.js';
import {
  Boolean,
  CollectionItemManager,
  CollectionItemReference,
  ContextHeading,
  DFModal,
  Dollar,
  Ein,
  Enum,
  GenericString,
  Heading,
  InfoDisplay,
  LimitingString,
  SaveAndOrContinueButton,
  SetFactAction,
  TaxReturnAlert,
} from '../../ContentDeclarations.js';

export const SelfEmploymentIncomeSubcategory = (
  <Subcategory
    route='self-employment'
    completeIf='/isScheduleCSectionComplete'
    collectionContext='/scheduleCBusinesses'
    dataItems={[
      {
        itemKey: `selfEmploymentTaxable`,
        conditions: [`/hasScheduleCIncome`],
      },
      {
        itemKey: `selfEmploymentNoneTaxable`,
        conditions: [{ operator: `isFalse`, condition: `/hasScheduleCIncome` }],
      },
    ]}
  >
    {/* Gateway question */}
    <Screen route='self-employment-gateway'>
      <ContextHeading i18nKey='/heading/income/self-employment' />
      <Heading
        i18nKey='/heading/income/self-employment/gateway'
        condition={{ operator: `isFalse`, condition: `/isFilingStatusMFJ` }}
      />
      <Heading i18nKey='/heading/income/self-employment/gateway-mfj' condition='/isFilingStatusMFJ' />
      <InfoDisplay i18nKey='/info/income/self-employment/gateway' />
      <DFModal i18nKey='/info/income/self-employment/what-counts' />
      <Boolean path='/hasSelfEmploymentIncome' />
      <SaveAndOrContinueButton />
    </Screen>

    {/* Collection intro + manager (only if they said yes) */}
    <Screen route='schedule-c-loop-intro' condition='/hasSelfEmploymentIncome'>
      <Heading i18nKey='/heading/income/self-employment' condition='/hasScheduleCBusinesses' />
      <ContextHeading
        displayOnlyOn='edit'
        i18nKey='/heading/income/self-employment'
        condition={{ operator: `isFalseOrIncomplete`, condition: `/hasScheduleCBusinesses` }}
      />
      <Heading
        i18nKey='/heading/income/self-employment/intro'
        condition={{ operator: `isFalseOrIncomplete`, condition: `/hasScheduleCBusinesses` }}
      />
      <InfoDisplay i18nKey='/info/income/self-employment/intro' />
      <DFModal i18nKey='/info/income/self-employment/what-is-schedule-c' />
      <CollectionItemManager
        path='/scheduleCBusinesses'
        loopName='/scheduleCBusinesses'
        donePath='/scheduleCBusinessesIsDone'
      />
    </Screen>

    {/* Main collection loop */}
    <CollectionLoop
      loopName='/scheduleCBusinesses'
      collection='/scheduleCBusinesses'
      collectionItemCompletedCondition='/scheduleCBusinesses/*/isComplete'
      donePath='/scheduleCBusinessesIsDone'
      iconName='Business'
      dataViewSections={[
        {
          i18nKey: `dataviews./flow/income/self-employment.primaryFilerBusinesses`,
          condition: `/scheduleCBusinesses/*/filer/isPrimaryFiler`,
        },
        {
          i18nKey: `dataviews./flow/income/self-employment.secondaryFilerBusinesses`,
          condition: `/scheduleCBusinesses/*/belongsToSecondaryFiler`,
        },
      ]}
    >
      {/* === Business Info === */}
      <SubSubcategory route='schedule-c-business-info'>
        <Screen route='schedule-c-whose-business' condition='/isFilingStatusMFJ'>
          <Heading i18nKey='/heading/income/self-employment/whose-business' />
          <TaxReturnAlert
            i18nKey='/info/income/self-employment/secondary-filer-without-mfj'
            headingLevel='h3'
            type='error'
            condition='/scheduleCBusinesses/*/secondaryFilerUsedWithoutMFJ'
          />
          <CollectionItemReference path='/scheduleCBusinesses/*/filer' displayOnlyOn='edit' />
          <GenericString path='/scheduleCBusinesses/*/filer/fullName' displayOnlyOn='data-view' />
          <SaveAndOrContinueButton />
        </Screen>
        <Screen route='schedule-c-business-name'>
          <Heading i18nKey='/heading/income/self-employment/business-name' />
          <InfoDisplay i18nKey='/info/income/self-employment/business-name' />
          <SetFactAction
            path='/scheduleCBusinesses/*/filer'
            source='/primaryFiler'
            conditions={[
              { operator: `isIncomplete`, condition: `/scheduleCBusinesses/*/filer` },
              { operator: `isFalseOrIncomplete`, condition: `/treatAsMFJ` },
            ]}
          />
          <LimitingString path='/scheduleCBusinesses/*/businessName' />
          <SaveAndOrContinueButton />
        </Screen>
        <Screen route='schedule-c-business-code'>
          <Heading i18nKey='/heading/income/self-employment/business-code' />
          <InfoDisplay i18nKey='/info/income/self-employment/business-code' />
          <DFModal i18nKey='/info/income/self-employment/find-naics-code' />
          <GenericString path='/scheduleCBusinesses/*/principalBusinessCode' />
          <SaveAndOrContinueButton />
        </Screen>
        <Screen route='schedule-c-has-ein'>
          <Heading i18nKey='/heading/income/self-employment/has-ein' />
          <InfoDisplay i18nKey='/info/income/self-employment/has-ein' />
          <Boolean path='/scheduleCBusinesses/*/hasEin' />
          <SaveAndOrContinueButton />
        </Screen>
        <Screen route='schedule-c-ein' condition='/scheduleCBusinesses/*/hasEin'>
          <Heading i18nKey='/heading/income/self-employment/ein' />
          <Ein path='/scheduleCBusinesses/*/ein' />
          <SaveAndOrContinueButton />
        </Screen>
        <Screen route='schedule-c-accounting-method'>
          <Heading i18nKey='/heading/income/self-employment/accounting-method' />
          <InfoDisplay i18nKey='/info/income/self-employment/accounting-method' />
          <Enum path='/scheduleCBusinesses/*/accountingMethod' />
          <SaveAndOrContinueButton />
        </Screen>
      </SubSubcategory>

      {/* === Income === */}
      <SubSubcategory route='schedule-c-income'>
        <Screen route='schedule-c-gross-receipts'>
          <Heading i18nKey='/heading/income/self-employment/gross-receipts' />
          <InfoDisplay i18nKey='/info/income/self-employment/gross-receipts' />
          <DFModal i18nKey='/info/income/self-employment/what-are-gross-receipts' />
          <Dollar path='/scheduleCBusinesses/*/grossReceipts' />
          <SaveAndOrContinueButton />
        </Screen>
        <Screen route='schedule-c-returns-allowances'>
          <Heading i18nKey='/heading/income/self-employment/returns-allowances' />
          <InfoDisplay i18nKey='/info/income/self-employment/returns-allowances' />
          <Dollar path='/scheduleCBusinesses/*/returnsAndAllowances' required={false} />
          <SaveAndOrContinueButton />
        </Screen>
        <Screen route='schedule-c-cogs'>
          <Heading i18nKey='/heading/income/self-employment/cogs' />
          <InfoDisplay i18nKey='/info/income/self-employment/cogs' />
          <DFModal i18nKey='/info/income/self-employment/what-is-cogs' />
          <Dollar path='/scheduleCBusinesses/*/costOfGoodsSold' required={false} />
          <SaveAndOrContinueButton />
        </Screen>
      </SubSubcategory>

      {/* === Expenses === */}
      <SubSubcategory route='schedule-c-expenses'>
        <Screen route='schedule-c-expenses-intro'>
          <Heading i18nKey='/heading/income/self-employment/expenses-intro' />
          <InfoDisplay i18nKey='/info/income/self-employment/expenses-intro' />
          <SaveAndOrContinueButton />
        </Screen>
        <Screen route='schedule-c-advertising'>
          <Heading i18nKey='/heading/income/self-employment/advertising' />
          <Dollar path='/scheduleCBusinesses/*/advertising' required={false} />
          <SaveAndOrContinueButton />
        </Screen>
        <Screen route='schedule-c-car-truck'>
          <Heading i18nKey='/heading/income/self-employment/car-truck' />
          <InfoDisplay i18nKey='/info/income/self-employment/car-truck' />
          <Dollar path='/scheduleCBusinesses/*/carAndTruck' required={false} />
          <SaveAndOrContinueButton />
        </Screen>
        <Screen route='schedule-c-commissions'>
          <Heading i18nKey='/heading/income/self-employment/commissions' />
          <Dollar path='/scheduleCBusinesses/*/commissions' required={false} />
          <SaveAndOrContinueButton />
        </Screen>
        <Screen route='schedule-c-contract-labor'>
          <Heading i18nKey='/heading/income/self-employment/contract-labor' />
          <Dollar path='/scheduleCBusinesses/*/contractLabor' required={false} />
          <SaveAndOrContinueButton />
        </Screen>
        <Screen route='schedule-c-insurance'>
          <Heading i18nKey='/heading/income/self-employment/insurance' />
          <InfoDisplay i18nKey='/info/income/self-employment/insurance' />
          <Dollar path='/scheduleCBusinesses/*/insurance' required={false} />
          <SaveAndOrContinueButton />
        </Screen>
        <Screen route='schedule-c-legal-professional'>
          <Heading i18nKey='/heading/income/self-employment/legal-professional' />
          <Dollar path='/scheduleCBusinesses/*/legalAndProfessional' required={false} />
          <SaveAndOrContinueButton />
        </Screen>
        <Screen route='schedule-c-office-expense'>
          <Heading i18nKey='/heading/income/self-employment/office-expense' />
          <Dollar path='/scheduleCBusinesses/*/officeExpense' required={false} />
          <SaveAndOrContinueButton />
        </Screen>
        <Screen route='schedule-c-rent'>
          <Heading i18nKey='/heading/income/self-employment/rent' />
          <Dollar path='/scheduleCBusinesses/*/rent' required={false} />
          <SaveAndOrContinueButton />
        </Screen>
        <Screen route='schedule-c-repairs'>
          <Heading i18nKey='/heading/income/self-employment/repairs' />
          <Dollar path='/scheduleCBusinesses/*/repairs' required={false} />
          <SaveAndOrContinueButton />
        </Screen>
        <Screen route='schedule-c-supplies'>
          <Heading i18nKey='/heading/income/self-employment/supplies' />
          <Dollar path='/scheduleCBusinesses/*/supplies' required={false} />
          <SaveAndOrContinueButton />
        </Screen>
        <Screen route='schedule-c-taxes-licenses'>
          <Heading i18nKey='/heading/income/self-employment/taxes-licenses' />
          <InfoDisplay i18nKey='/info/income/self-employment/taxes-licenses' />
          <Dollar path='/scheduleCBusinesses/*/taxesAndLicenses' required={false} />
          <SaveAndOrContinueButton />
        </Screen>
        <Screen route='schedule-c-travel'>
          <Heading i18nKey='/heading/income/self-employment/travel' />
          <Dollar path='/scheduleCBusinesses/*/travel' required={false} />
          <SaveAndOrContinueButton />
        </Screen>
        <Screen route='schedule-c-meals'>
          <Heading i18nKey='/heading/income/self-employment/meals' />
          <InfoDisplay i18nKey='/info/income/self-employment/meals' />
          <Dollar path='/scheduleCBusinesses/*/meals' required={false} />
          <SaveAndOrContinueButton />
        </Screen>
        <Screen route='schedule-c-utilities'>
          <Heading i18nKey='/heading/income/self-employment/utilities' />
          <Dollar path='/scheduleCBusinesses/*/utilities' required={false} />
          <SaveAndOrContinueButton />
        </Screen>
        <Screen route='schedule-c-other-expenses'>
          <Heading i18nKey='/heading/income/self-employment/other-expenses' />
          <InfoDisplay i18nKey='/info/income/self-employment/other-expenses' />
          <Dollar path='/scheduleCBusinesses/*/otherExpenses' required={false} />
          <SetFactAction path='/scheduleCBusinesses/*/hasSeenLastAvailableScreen' source='/flowTrue' />
          <SaveAndOrContinueButton />
        </Screen>
      </SubSubcategory>
    </CollectionLoop>
  </Subcategory>
);
