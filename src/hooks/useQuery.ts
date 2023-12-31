import { useSearchParams } from 'react-router-dom';

export const useQuery = () => {
    const [searchParams, setSearchParams] = useSearchParams(location.search);

    const params: Params = {};
    searchParams.forEach((value, name) => (params[name] = value));

    const updateParams = (name: string, value: string) => {
        setSearchParams({ ...params, [name]: value });
    };
    return { params, updateParams };
};
