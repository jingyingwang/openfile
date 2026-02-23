/* eslint-disable max-len */
import { CollectionLoop, Screen, Subcategory, SubSubcategory } from '../../flowDeclarations.js';
import {
  CollectionItemManager,
  CollectionItemReference,
  ContextHeading,
  DFAlert,
  Dollar,
  Ein,
  GenericString,
  Heading,
  InfoDisplay,
  SaveAndOrContinueButton,
  SetFactAction,
  TaxReturnAlert,
} from '../../ContentDeclarations.js';

export const Form1099KSubcategory = (
  <Subcategory
    route='1099-k'
    completeIf='/form1099KsIsDone'
    collectionContext='/form1099Ks'
    dataItems={[
      {
        itemKey: `form1099KTaxable`,
        conditions: [`/has1099KIncome`],
      },
      {
        itemKey: `form1099KNoneTaxable`,
        conditions: [{ operator: `isFalse`, condition: `/has1099KIncome` }],
      },
    ]}
  >
    <Screen route='1099k-loop-intro'>
      <ContextHeading
        displayOnlyOn='edit'
        i18nKey='/heading/income/1099K'
        batches={[`form-1099k-0`]}
        condition={{ operator: `isFalseOrIncomplete`, condition: `/has1099K` }}
      />
      <Heading i18nKey='/heading/income/1099K' batches={[`form-1099k-0`]} condition='/has1099K' />

      <Heading
        i18nKey='/heading/income/1099K/intro'
        batches={[`form-1099k-0`]}
        condition={{ operator: `isFalseOrIncomplete`, condition: `/has1099K` }}
      />

      <InfoDisplay condition='/has1099K' i18nKey='/info/income/1099K/add' batches={[`form-1099k-0`]} />

      <DFAlert
        condition={{ operator: `isFalseOrIncomplete`, condition: `/has1099K` }}
        i18nKey='/info/income/1099K/what-is-1099k'
        headingLevel='h2'
        batches={[`form-1099k-0`]}
        type='info'
      />

      <CollectionItemManager
        path='/form1099Ks'
        loopName='/form1099Ks'
        donePath='/form1099KsIsDone'
        batches={[`form-1099k-0`]}
      />
    </Screen>
    <CollectionLoop
      loopName='/form1099Ks'
      collection='/form1099Ks'
      collectionItemCompletedCondition='/form1099Ks/*/isComplete'
      donePath='/form1099KsIsDone'
      dataViewSections={[
        {
          i18nKey: `dataviews./flow/income/1099K.primaryFiler1099K`,
          condition: `/form1099Ks/*/belongsToPrimaryFiler`,
        },
        {
          i18nKey: `dataviews./flow/income/1099K.secondaryFiler1099K`,
          condition: `/form1099Ks/*/belongsToSecondaryFiler`,
        },
      ]}
    >
      <SubSubcategory route='1099k-basic-info'>
        <Screen route='1099k-add-whose' condition='/isFilingStatusMFJ'>
          <TaxReturnAlert
            i18nKey='/info/income/1099K/secondary-filer-income-without-mfj'
            headingLevel='h3'
            type='error'
            condition='/form1099Ks/*/secondaryFilerUsedWithoutMFJ'
            batches={[`form-1099k-0`]}
          />
          <Heading i18nKey='/heading/income/1099K/1099K-add-whose' batches={[`form-1099k-0`]} />
          <CollectionItemReference path='/form1099Ks/*/filer' displayOnlyOn='edit' batches={[`form-1099k-0`]} />
          <GenericString path='/form1099Ks/*/filer/firstName' displayOnlyOn='data-view' batches={[`form-1099k-0`]} />
          <SaveAndOrContinueButton />
        </Screen>
        <Screen route='1099k-add-payer'>
          <Heading i18nKey='/heading/income/1099K/1099K-add-payer' batches={[`form-1099k-0`]} />
          <InfoDisplay i18nKey='/info/income/1099K/payer-name' batches={[`form-1099k-0`]} />
          <GenericString path='/form1099Ks/*/payer' batches={[`form-1099k-0`]} />
          <SaveAndOrContinueButton />
        </Screen>
        <Screen route='1099k-add-box-1a'>
          <Heading i18nKey='/heading/income/1099K/1099K-add-box-1a' batches={[`form-1099k-0`]} />
          <InfoDisplay i18nKey='/info/income/1099K/box-1a' batches={[`form-1099k-0`]} />
          <Dollar path='/form1099Ks/*/writableGrossAmount' batches={[`form-1099k-0`]} />
          <SaveAndOrContinueButton />
        </Screen>
        <Screen route='1099k-add-box-4'>
          <Heading i18nKey='/heading/income/1099K/1099K-add-box-4' batches={[`form-1099k-0`]} />
          <InfoDisplay i18nKey='/info/income/1099K/box-4-can-be-blank' batches={[`form-1099k-0`]} />
          <Dollar path='/form1099Ks/*/writableFederalTaxWithheld' required={false} batches={[`form-1099k-0`]} />
          <SaveAndOrContinueButton />
        </Screen>
        <Screen route='1099k-add-payer-tin' condition='/form1099Ks/*/hasFederalWithholding'>
          <Heading i18nKey='/heading/income/1099K/1099K-add-payer-tin' batches={[`form-1099k-0`]} />
          <InfoDisplay i18nKey='/info/income/1099K/payer-tin' batches={[`form-1099k-0`]} />
          <Ein path='/form1099Ks/*/payer/tin' batches={[`form-1099k-0`]} />
          <SetFactAction path='/form1099Ks/*/hasSeenLastAvailableScreen' source='/flowTrue' />
          <SaveAndOrContinueButton />
        </Screen>
        <Screen
          route='1099k-complete'
          condition={{ operator: `isFalse`, condition: `/form1099Ks/*/hasFederalWithholding` }}
        >
          <SetFactAction path='/form1099Ks/*/hasSeenLastAvailableScreen' source='/flowTrue' />
          <SaveAndOrContinueButton />
        </Screen>
      </SubSubcategory>
    </CollectionLoop>
  </Subcategory>
);
