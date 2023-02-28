import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import petApi from "../api/petApi";
import { useAuth } from "../contexts/AuthContext";

export default function usePets({ defaultPage = 1, limit = 20 }) {
  const { token } = useAuth();

  const [petList, setPetList] = useState([]);
  const [page, setPage] = useState({
    current_page: defaultPage,
    total_pages: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadFirst, setIsLoadFirst] = useState(true);

  useEffect(() => {
    if (token) {
      (async () => {
        try {
          setIsLoading((prev) => !prev);
          const params = {
            page: page?.current_page,
            limit,
          };
          const response = await petApi.getAll(params, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setPetList(response?.animals);
          setPage((prev) => ({
            ...prev,
            total_pages: response?.pagination?.total_pages,
          }));
          setIsLoading((prev) => !prev);
        } catch (e) {
          setIsLoading((prev) => !prev);
        }
      })();
    }
  }, [token, page?.current_page, limit]);

  const handleChangePage = (number) => {
    setPage((prev) => ({ ...prev, current_page: number }));
    if (isLoadFirst) setIsLoadFirst(false);
  };

  return { isLoading, isLoadFirst, page, handleChangePage, petList };
}
