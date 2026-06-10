import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";
import { useExportUsers } from "./useExportUsers";
import { useUserWithNoTypes } from "./useUsersWithNoTypes";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzUFe3bLjCJSIlfdJbh-8SgAo52LmacnIwSopmSEIEtw0oTZSwXSww1SrbgC1q07Fc/exec";

export default function ExportToExcelButton() {
  const { refetch, isFetching } = useUserWithNoTypes();
  const { exportUsers, isExporting } = useExportUsers();

  const handleExport = async () => {
    // 1) pobierz użytkowników DOPIERO po kliknięciu
    const { data } = await refetch(); // useQuery z enabled:false można ręcznie refetchować [web:148][web:160]

    if (!data || data.length === 0) {
      alert("Brak użytkowników do eksportu");
      return;
    }

    // 2) zmapuj dane
    const excelData = data.map((u) => ({
      Pseudonim: u.userName,
      NrTel: u.phoneNumber,
      Target: "noTypes",
    }));

    // 3) wyślij do Google Sheets
    exportUsers({ excelData, GOOGLE_SCRIPT_URL });
  };

  const disabled = isFetching || isExporting;

  return (
    <Button onClick={handleExport} disabled={disabled}>
      {disabled ? <SpinnerMini /> : "Użytkownicy bez typów"}
    </Button>
  );
}
