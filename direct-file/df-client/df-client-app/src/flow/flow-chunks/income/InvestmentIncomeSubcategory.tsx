/* eslint-disable max-len */
import { CollectionLoop, Screen, Subcategory, SubSubcategory } from '../../flowDeclarations.js';
import {
  Boolean,
  CollectionItemManager,
  CollectionItemReference,
  ContextHeading,
  DFModal,
  Dollar,
  GenericString,
  Heading,
  InfoDisplay,
  SaveAndOrContinueButton,
  SetFactAction,
  DatePicker,
  LimitingString,
} from '../../ContentDeclarations.js';

export const InvestmentIncomeSubcategory = (
  <Subcategory route='investment-income' completeIf='/investmentIncomeIsComplete'>
    {/* === 1099-DIV Section === */}
    <Screen route='investment-income-intro'>
      <ContextHeading i18nKey='/heading/income' />
      <Heading
        i18nKey='/heading/income/investment/intro'
        condition={{ operator: `isFalse`, condition: `/isFilingStatusMFJ` }}
      />
      <Heading i18nKey='/heading/income/investment/intro-mfj' condition='/isFilingStatusMFJ' />
      <InfoDisplay i18nKey='/info/income/investment/intro' />
      <SaveAndOrContinueButton />
    </Screen>

    {/* 1099-DIV collection loop */}
    <Screen route='div-income-loop-intro'>
      <Heading i18nKey='/heading/income/investment/dividends' condition='/has1099DIV' />
      <ContextHeading
        displayOnlyOn='edit'
        i18nKey='/heading/income/investment/dividends'
        condition={{ operator: `isFalseOrIncomplete`, condition: `/has1099DIV` }}
      />
      <Heading
        i18nKey='/heading/income/investment/dividends-intro'
        condition={{ operator: `isFalseOrIncomplete`, condition: `/has1099DIV` }}
      />
      <InfoDisplay i18nKey='/info/income/investment/dividends-intro' />
      <DFModal i18nKey='/info/income/investment/what-is-1099-div' />
      <CollectionItemManager path='/form1099DIVs' loopName='/form1099DIVs' donePath='/form1099DIVsIsDone' />
    </Screen>

    <CollectionLoop
      loopName='/form1099DIVs'
      collection='/form1099DIVs'
      iconName='AttachMoney'
      collectionItemCompletedCondition='/form1099DIVs/*/isComplete'
      donePath='/form1099DIVsIsDone'
    >
      <SubSubcategory route='div-basic-info'>
        <Screen route='div-add-whose' condition='/isFilingStatusMFJ'>
          <Heading i18nKey='/heading/income/investment/div-add-whose' />
          <InfoDisplay i18nKey='/info/income/investment/div-add-whose' />
          <CollectionItemReference path='/form1099DIVs/*/filer' displayOnlyOn='edit' />
          <SaveAndOrContinueButton />
        </Screen>
        <Screen route='div-add-payer'>
          <Heading i18nKey='/heading/income/investment/div-add-payer' />
          <InfoDisplay i18nKey='/info/income/investment/div-add-payer' />
          <SetFactAction
            path='/form1099DIVs/*/filer'
            source='/primaryFiler'
            conditions={[
              { operator: `isIncomplete`, condition: `/form1099DIVs/*/filer` },
              { operator: `isFalseOrIncomplete`, condition: `/treatAsMFJ` },
            ]}
          />
          <LimitingString path='/form1099DIVs/*/payer' />
          <SaveAndOrContinueButton />
        </Screen>
      </SubSubcategory>

      <SubSubcategory route='div-amounts'>
        <Screen route='div-add-box-1a'>
          <Heading i18nKey='/heading/income/investment/div-box-1a' />
          <InfoDisplay i18nKey='/info/income/investment/div-box-1a' />
          <Dollar path='/form1099DIVs/*/writableOrdinaryDividends' />
          <SaveAndOrContinueButton />
        </Screen>
        <Screen route='div-add-box-1b'>
          <Heading i18nKey='/heading/income/investment/div-box-1b' />
          <InfoDisplay i18nKey='/info/income/investment/div-box-1b' />
          <DFModal i18nKey='/info/income/investment/what-are-qualified-dividends' />
          <Dollar path='/form1099DIVs/*/writableQualifiedDividends' required={false} />
          <SaveAndOrContinueButton />
        </Screen>
        <Screen route='div-add-box-2a'>
          <Heading i18nKey='/heading/income/investment/div-box-2a' />
          <InfoDisplay i18nKey='/info/income/investment/div-box-2a' />
          <DFModal i18nKey='/info/income/investment/what-are-capital-gain-distributions' />
          <Dollar path='/form1099DIVs/*/writableTotalCapitalGain' required={false} />
          <SaveAndOrContinueButton />
        </Screen>
      </SubSubcategory>

      <SubSubcategory route='div-withholding'>
        <Screen route='div-add-box-4'>
          <Heading i18nKey='/heading/income/investment/div-box-4' />
          <InfoDisplay i18nKey='/info/income/investment/div-box-4' />
          <Dollar path='/form1099DIVs/*/writableFederalTaxWithheld' required={false} />
          <SaveAndOrContinueButton />
        </Screen>
        <Screen route='div-add-box-7'>
          <Heading i18nKey='/heading/income/investment/div-box-7' />
          <InfoDisplay i18nKey='/info/income/investment/div-box-7' />
          <Dollar path='/form1099DIVs/*/writableForeignTaxPaid' required={false} />
          <SetFactAction path='/form1099DIVs/*/hasSeenLastAvailableScreen' source='/flowTrue' />
          <SaveAndOrContinueButton />
        </Screen>
      </SubSubcategory>
    </CollectionLoop>

    {/* === Form 8949 Section: Capital asset transactions === */}
    <Screen route='capital-gains-loop-intro'>
      <Heading i18nKey='/heading/income/investment/capital-gains' condition='/hasForm8949Transactions' />
      <ContextHeading
        displayOnlyOn='edit'
        i18nKey='/heading/income/investment/capital-gains'
        condition={{ operator: `isFalseOrIncomplete`, condition: `/hasForm8949Transactions` }}
      />
      <Heading
        i18nKey='/heading/income/investment/capital-gains-intro'
        condition={{ operator: `isFalseOrIncomplete`, condition: `/hasForm8949Transactions` }}
      />
      <InfoDisplay i18nKey='/info/income/investment/capital-gains-intro' />
      <DFModal i18nKey='/info/income/investment/what-is-form-8949' />
      <CollectionItemManager
        path='/form8949Transactions'
        loopName='/form8949Transactions'
        donePath='/form8949TransactionsIsDone'
      />
    </Screen>

    <CollectionLoop
      loopName='/form8949Transactions'
      collection='/form8949Transactions'
      iconName='TrendingUp'
      collectionItemCompletedCondition='/form8949Transactions/*/isComplete'
      donePath='/form8949TransactionsIsDone'
    >
      <SubSubcategory route='transaction-details'>
        <Screen route='transaction-description'>
          <Heading i18nKey='/heading/income/investment/transaction-description' />
          <InfoDisplay i18nKey='/info/income/investment/transaction-description' />
          <GenericString path='/form8949Transactions/*/description' />
          <SaveAndOrContinueButton />
        </Screen>
        <Screen route='transaction-dates'>
          <Heading i18nKey='/heading/income/investment/transaction-dates' />
          <InfoDisplay i18nKey='/info/income/investment/transaction-dates' />
          <DatePicker path='/form8949Transactions/*/dateAcquired' />
          <DatePicker path='/form8949Transactions/*/dateSold' />
          <SaveAndOrContinueButton />
        </Screen>
        <Screen route='transaction-amounts'>
          <Heading i18nKey='/heading/income/investment/transaction-amounts' />
          <InfoDisplay i18nKey='/info/income/investment/transaction-amounts' />
          <Dollar path='/form8949Transactions/*/proceeds' />
          <Dollar path='/form8949Transactions/*/costBasis' />
          <SaveAndOrContinueButton />
        </Screen>
      </SubSubcategory>

      <SubSubcategory route='transaction-holding-period'>
        <Screen route='transaction-holding-period'>
          <Heading i18nKey='/heading/income/investment/transaction-holding-period' />
          <InfoDisplay i18nKey='/info/income/investment/transaction-holding-period' />
          <DFModal i18nKey='/info/income/investment/what-is-short-term-vs-long-term' />
          <Boolean path='/form8949Transactions/*/writableIsShortTerm' />
          <SaveAndOrContinueButton />
        </Screen>
      </SubSubcategory>

      <SubSubcategory route='transaction-adjustments'>
        <Screen route='transaction-basis-reported'>
          <Heading i18nKey='/heading/income/investment/transaction-basis-reported' />
          <InfoDisplay i18nKey='/info/income/investment/transaction-basis-reported' />
          <DFModal i18nKey='/info/income/investment/what-does-basis-reported-mean' />
          <Boolean path='/form8949Transactions/*/basisReportedToIRS' />
          <SaveAndOrContinueButton />
        </Screen>
        <Screen route='transaction-adjustment'>
          <Heading i18nKey='/heading/income/investment/transaction-adjustment' />
          <InfoDisplay i18nKey='/info/income/investment/transaction-adjustment' />
          <DFModal i18nKey='/info/income/investment/what-are-adjustment-codes' />
          <GenericString path='/form8949Transactions/*/writableAdjustmentCode' required={false} />
          <Dollar path='/form8949Transactions/*/writableAdjustmentAmount' required={false} />
          <SetFactAction path='/form8949Transactions/*/hasSeenLastAvailableScreen' source='/flowTrue' />
          <SaveAndOrContinueButton />
        </Screen>
      </SubSubcategory>
    </CollectionLoop>

    {/* === Summary screen === */}
    <Screen route='investment-income-summary'>
      <Heading i18nKey='/heading/income/investment/summary' />
      <InfoDisplay i18nKey='/info/income/investment/summary' />
      <Dollar path='/totalOrdinaryDividends' displayOnlyOn='data-view' />
      <Dollar path='/totalQualifiedDividends' displayOnlyOn='data-view' />
      <Dollar path='/capitalGainOrLossFor1040' displayOnlyOn='data-view' />
      <SaveAndOrContinueButton />
    </Screen>
  </Subcategory>
);
