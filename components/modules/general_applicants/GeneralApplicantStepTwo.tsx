'use client';

import { useTranslation } from '@/app/i18n/client';
import { Flex, Select, TextInput, Textarea } from '@mantine/core';
import { Dispatch, SetStateAction, useEffect } from 'react';

interface GeneralApplicantStepTwoProps {
	form: any;
	lng: string;
	provinces: Array<{ value: string; label: string }>;
	districts: Array<{ value: string; label: string }>;
	offices: Array<{ value: string; label: string }>;
	references: Array<{ value: string; label: string }>;
	setDistricts: any;
  office: string | null;
}

const GeneralApplicantStepTwo = ({
	form,
	lng,
	districts,
	offices,
	references,
	provinces,
	setDistricts,
  office
}: GeneralApplicantStepTwoProps) => {
	const { t } = useTranslation(lng);

	return (
		<>
			<Flex
				direction={{ base: 'column', sm: 'row' }}
				gap="sm"
				p="sm"
				justify={{ sm: 'center' }}
			>
				<Select
					style={{ flex: 1 }}
					label={t('province')}
					placeholder={t('province')}
					data={provinces}
					searchable
					clearable
					nothingFoundMessage={t('noting_found')}
					{...form.getInputProps('province_id')}
				/>
				<Select
					style={{ flex: 1 }}
					label={t('district')}
					placeholder={t('district')}
					data={districts}
					searchable
					clearable
					nothingFoundMessage={t('noting_found')}
					{...form.getInputProps('district_id')}
				/>
			</Flex>

			<Flex
				direction={{ base: 'column', sm: 'row' }}
				gap="sm"
				p="sm"
				justify={{ sm: 'center' }}
			>
				<TextInput
					style={{ flex: 1 }}
					label={t('address')}
					placeholder={t('address')}
					withAsterisk
					{...form.getInputProps('address')}
				/>
				<Select
					style={{ flex: 1 }}
					label={t('referenced_by')}
					placeholder={t('referenced_by')}
					data={references}
					searchable
					clearable
					nothingFoundMessage={t('noting_found')}
					{...form.getInputProps('referenced_by')}
				/>
			</Flex>
      {office == "all" && (
        <Flex
          direction={{ base: "column", sm: "row" }}
          gap="sm"
          p="sm"
          justify={{ sm: "center" }}
        >
          <Select
            style={{ flex: 1 }}
            label={t("office")}
            placeholder={t("office")}
            withAsterisk
            data={offices}
            searchable
            clearable
            nothingFoundMessage={t("noting_found")}
            // onSearchChange={handleSearch}
            // rightSection={loading && <Loader color="primary" size={15} />}
            {...form.getInputProps("office_id")}
          />
        </Flex>
      )}		
		</>
	);
};

export default GeneralApplicantStepTwo;
