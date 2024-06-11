'use client';

import { useTranslation } from '@/app/i18n/client';
import { Flex, Select, TextInput } from '@mantine/core';
import { useEffect , useState} from 'react';
import { useAxios } from "@/customHooks/useAxios";

interface GeneralApplicantStepTwoProps {
	form: any;
	lng: string;
	provinces: Array<{ value: string; label: string }>;
	offices: Array<{ value: string; label: string }>;
	references: Array<{ value: string; label: string }>;
  office: string | null;
  editDistrict: string | undefined;
	setEditDistrict: any;
}

const GeneralApplicantStepTwo = ({
	form,
	lng,
	offices,
	references,
	provinces,
	editDistrict,
	setEditDistrict,
  office
}: GeneralApplicantStepTwoProps) => {
	const { t } = useTranslation(lng);

  const callApi = useAxios();
	const [loading, setLoading] = useState(false);
	const [districts, setDistricts] = useState([]);

  useEffect(() => {
		(async function () {
			if (editDistrict) {
				form.setFieldValue("district_id", editDistrict);
				setEditDistrict("");
			} else {
				form.setFieldValue("district_id", null);
				setDistricts([]);
			}
			if (form?.values?.province_id) {
				setLoading(true);
				const { response, status, error } = await callApi({
					method: "GET",
					url: `/all_districts?province_id=${form?.values?.province_id}`,
				});
				if (status == 200 && response.result == true) {
					setDistricts(
						response.data.map((item: any) => {
							return { value: item.id.toString(), label: item.name_fa };
						})
					);
				}
				setLoading(false);
			}
		})();
	}, [form?.values?.province_id, callApi, setEditDistrict, editDistrict]);

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
					withAsterisk
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
					withAsterisk
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
					withAsterisk					
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
