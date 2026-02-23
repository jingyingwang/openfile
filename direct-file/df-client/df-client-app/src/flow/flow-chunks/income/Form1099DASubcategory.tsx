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

export const Form1099DASubcategory = (
  <Subcategory
    route='1099-da'
    completeIf='/form1099DAsIsDone'
    collectionContext='/form1099DAs'
    dataItems={[
      {
        itemKey: `form1099DATaxable`,
        conditions: [`/has1099DA`],
      },
      {
        itemKey: `form1099DANoneTaxable`,
        conditions: [{ operator: `isFalse`, condition: `/has1099DA` }],
      },
    ]}
  >
    <Screen route='1099da-loop-intro'>
      <ContextHeading
        displayOnlyOn='edit'
        i18nKey='/heading/income/1099DA'
        batches={[`form-1099da-0`]}
        condition={{ operator: `isFalseOrIncomplete`, condition: `/has1099DA` }}
      />
      <Heading i18nKey='/heading/income/1099DA' batches={[`form-1099da-0`]} condition='/has1099DA' />

      <Heading
        i18nKey='/heading/income/1099DA/intro'
        batches={[`form-1099da-0`]}
        condition={{ operator: `isFalseOrIncomplete`, condition: `/has1099DA` }}
      />

      <InfoDisplay condition='/has1099DA' i18nKey='/info/income/1099DA/add' batches={[`form-1099da-0`]} />

      <DFAlert
        condition={{ operator: `isFalseOrIncomplete`, condition: `/has1099DA` }}
        i18nKey='/info/income/1099DA/what-is-1099da'
        headingLevel='h2'
        batches={[`form-1099da-0`]}
        type='info'
      />

      <CollectionItemManager
        path='/form1099DAs'
        loopName='/form1099DAs'
        donePath='/form1099DAsIsDone'
        batches={[`form-1099da-0`]}
      />
    </Screen>
    <CollectionLoop
      loopName='/form1099DAs'
      collection='/form1099DAs'
      collectionItemCompletedCondition='/form1099DAs/*/isComplete'
      donePath='/form1099DAsIsDone'
      dataViewSections={[
        {
          i18nKey: `dataviews./flow/income/1099DA.primaryFiler1099DA`,
          condition: `/form1099DAs/*/belongsToPrimaryFiler`,
        },
        {
          i18nKey: `dataviews./flow/income/1099DA.secondaryFiler1099DA`,
          condition: `/form1099DAs/*/belongsToSecondaryFiler`,
        },
      ]}
    >
      <SubSubcategory route='1099da-basic-info'>
        <Screen route='1099da-add-whose' condition='/isFilingStatusMFJ'>
          <TaxReturnAlert
            i18nKey='/info/income/1099DA/secondary-filer-income-without-mfj'
            headingLevel='h3'
            type='error'
            condition='/form1099DAs/*/secondaryFilerUsedWithoutMFJ'
            batches={[`form-1099da-0`]}
          />
          <Heading i18nKey='/heading/income/1099DA/1099DA-add-whose' batches={[`form-1099da-0`]} />
          <CollectionItemReference path='/form1099DAs/*/filer' displayOnlyOn='edit' batches={[`form-1099da-0`]} />
          <GenericString path='/form1099DAs/*/filer/firstName' displayOnlyOn='data-view' batches={[`form-1099da-0`]} />
          <SaveAndOrContinueButton />
        </Screen>
        <Screen route='1099da-add-broker'>
          <Heading i18nKey='/heading/income/1099DA/1099DA-add-broker' batches={[`form-1099da-0`]} />
          <InfoDisplay i18nKey='/info/income/1099DA/broker-name' batches={[`form-1099da-0`]} />
          <GenericString path='/form1099DAs/*/brokerName' batches={[`form-1099da-0`]} />
          <SaveAndOrContinueButton />
        </Screen>
        <Screen route='1099da-add-description'>
          <Heading i18nKey='/heading/income/1099DA/1099DA-add-description' batches={[`form-1099da-0`]} />
          <InfoDisplay i18nKey='/info/income/1099DA/asset-description' batches={[`form-1099da-0`]} />
          <GenericString path='/form1099DAs/*/assetDescription' batches={[`form-1099da-0`]} />
          <SaveAndOrContinueButton />
        </Screen>
        <Screen route='1099da-add-proceeds'>
          <Heading i18nKey='/heading/income/1099DA/1099DA-add-proceeds' batches={[`form-1099da-0`]} />
          <InfoDisplay i18nKey='/info/income/1099DA/box-1d' batches={[`form-1099da-0`]} />
          <Dollar path='/form1099DAs/*/writableProceeds' batches={[`form-1099da-0`]} />
          <SaveAndOrContinueButton />
        </Screen>
        <Screen route='1099da-add-cost-basis'>
          <Heading i18nKey='/heading/income/1099DA/1099DA-add-cost-basis' batches={[`form-1099da-0`]} />
          <InfoDisplay i18nKey='/info/income/1099DA/box-1e' batches={[`form-1099da-0`]} />
          <Dollar path='/form1099DAs/*/writableCostBasis' batches={[`form-1099da-0`]} />
          <SaveAndOrContinueButton />
        </Screen>
        <Screen route='1099da-add-box-4'>
          <Heading i18nKey='/heading/income/1099DA/1099DA-add-box-4' batches={[`form-1099da-0`]} />
          <InfoDisplay i18nKey='/info/income/1099DA/box-4-can-be-blank' batches={[`form-1099da-0`]} />
          <Dollar path='/form1099DAs/*/writableFederalTaxWithheld' required={false} batches={[`form-1099da-0`]} />
          <SaveAndOrContinueButton />
        </Screen>
        <Screen route='1099da-add-broker-tin' condition='/form1099DAs/*/hasFederalWithholding'>
          <Heading i18nKey='/heading/income/1099DA/1099DA-add-broker-tin' batches={[`form-1099da-0`]} />
          <InfoDisplay i18nKey='/info/income/1099DA/broker-tin' batches={[`form-1099da-0`]} />
          <Ein path='/form1099DAs/*/brokerName/tin' batches={[`form-1099da-0`]} />
          <SetFactAction path='/form1099DAs/*/hasSeenLastAvailableScreen' source='/flowTrue' />
          <SaveAndOrContinueButton />
        </Screen>
        <Screen
          route='1099da-complete'
          condition={{ operator: `isFalse`, condition: `/form1099DAs/*/hasFederalWithholding` }}
        >
          <SetFactAction path='/form1099DAs/*/hasSeenLastAvailableScreen' source='/flowTrue' />
          <SaveAndOrContinueButton />
        </Screen>
      </SubSubcategory>
    </CollectionLoop>
  </Subcategory>
);
