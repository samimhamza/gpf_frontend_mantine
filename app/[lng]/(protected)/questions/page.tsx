import { QuestionModule } from "@/components/modules/surveys/questions";
import usePermissionChecker from "@/customHooks/usePermissionChecker";
import { VIEW_QUESTIONS } from "@/shared/constants/Permissions";

const QuestionsPage = async ({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) => {
  await usePermissionChecker(VIEW_QUESTIONS);
  return <QuestionModule lng={lng} />;
};

export default QuestionsPage;
