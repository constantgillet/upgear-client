import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled, { css } from "styled-components";
import Input from "../components/Input";
import { MainStyle } from "../styles/style";
import Select from "./Select";
import departments from "../docs/departments.json";
import { useRouter } from "next/dist/client/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSort, faTrashAlt } from "@fortawesome/fontawesome-free-solid";
import useDebounce from "../hooks/useDebounce.js";
import Button from "./Button";

const regions = [];
getRegions();

function getRegions() {
  departments.forEach((department) => {
    const region = { regionCode: department.regionCode, regionName: department.regionName };

    if (!regions.some((_region) => _region.regionCode === region.regionCode)) {
      regions.push(region);
    }
  });
}

const { Option, OptGroup } = Select;

const Title = styled.h2`
  text-align: center;
`;

const SearchFiltersContainer = styled.div`
  height: 100%;
  @media (max-width: ${MainStyle.breakpoint.lg}px) {
    left: 1px;
    position: fixed;
    width: 100%;
    top: 63px;
    z-index: 1;
    overflow: hidden;
    max-height: 68px;
    will-change: auto;
    pointer-events: none;
    transition: max-height 0.35s ease-in-out;
    //border-bottom: 1px solid #e8e9ec;

    h2 {
      display: none;
    }

    ${({ visible }) =>
      visible &&
      css`
        max-height: 700px;
        height: 100%;
      `}
  }
`;
const SearchFiltersElement = styled.aside`
  background: white;
  padding: ${MainStyle.space.m}px;
  border-radius: ${MainStyle.radius.m}px;
  position: sticky;
  top: 84px;
  z-index: 2;
  border: 1px solid #e8e9ec;
  pointer-events: all;

  @media (max-width: ${MainStyle.breakpoint.lg}px) {
    border-left: none;
    border-right: none;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    padding: 14px;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
  }
`;

const InputSearchContainer = styled.div`
  width: 100%auto;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  display: flex;
  flex-wrap: nowrap;
  margin-bottom: 12px;
`;

const InputSearch = styled(Input)``;

const ButtonFiltersToggle = styled(Button)`
  margin-left: ${MainStyle.space.s}px;

  @media (min-width: ${MainStyle.breakpoint.lg}px) {
    display: none;
  }
`;

const SelectElement = styled(Select)`
  margin-bottom: 12px;
`;

const DeleteFilters = styled.div`
  cursor: pointer;
  font-size: 14px;
  color: #d2d2d2;
  text-align: center;
  padding-top: 8px;
  padding-bottom: 8px;
  transition: 0.2s ease-out all;

  &:hover {
    color: #969696;
  }

  svg {
    margin-right: 8px;
  }
`;

function SearchFilters({ categories, setSearchPageLoading }) {
  const router = useRouter();
  const [queryValue, setQueryValue] = useState(router?.query?.q || "");
  const [category, setCategoryName] = useState(router?.query?.categoryName || null);
  const [regionValue, setRegionValue] = useState(null);
  const [departmentValues, setDepartmentValues] = useState(router?.query?.departement || []);

  const queryValueDebounced = useDebounce(queryValue, 500);

  const [init, setInit] = useState(false);

  const [filtersVisible, setFiltersVisible] = useState(false);

  // Effect for API call
  useEffect(
    () => {
      if (init) {
        const params = {
          pathname: window.location.pathname,
          query: { ...router.query, page: 1, q: queryValueDebounced }
        };

        if (!queryValueDebounced.length) {
          delete params.query?.q;
        }

        delete params.query?.categoryName;

        router.push(params);
      }
    },
    [queryValueDebounced] // Only call effect if debounced search term changes
  );

  useEffect(() => {
    setInit(true);
  }, []);

  return (
    <SearchFiltersContainer visible={filtersVisible}>
      <SearchFiltersElement>
        <Title>Filtres</Title>
        <InputSearchContainer>
          <InputSearch
            placeholder="Votre recherche"
            value={queryValue}
            onChange={(e) => setQueryValue(e.target.value)}
          />
          <ButtonFiltersToggle
            icon={<FontAwesomeIcon icon={faSort} />}
            onClick={() => setFiltersVisible(!filtersVisible)}
          >
            Filtres
          </ButtonFiltersToggle>
        </InputSearchContainer>
        <SelectElement
          placeholder="Choisissez une catégorie"
          style={{ width: "100%" }}
          value={category}
          onChange={(val) => {
            setCategoryName(val);

            const params = {
              pathname: val ? `/offres/${val}` : "/offres",
              query: { ...router.query, page: 1 }
            };

            delete params.query?.categoryName;
            router.push(params);

            setSearchPageLoading(true);
          }}
          id="input-category"
          getPopupContainer={(element) => element.parentNode}
        >
          {categories?.map((category, index) => {
            return (
              <OptGroup key={index} label={category.label}>
                {category.subcategories?.map((subcategory) => (
                  <Option key={subcategory.name} value={subcategory.name}>
                    {subcategory.label}
                  </Option>
                ))}
              </OptGroup>
            );
          })}
        </SelectElement>
        <SelectElement
          placeholder="Région"
          style={{ width: "100%" }}
          value={regionValue}
          onChange={(regionCode) => {
            setRegionValue(regionCode);
            const newDepartments = departments.filter((department) => department.regionCode === regionCode);

            let newDepartmentValues = [];
            newDepartmentValues = newDepartments.map((department) => department.departmentCode);

            setDepartmentValues(newDepartmentValues);
            const params = {
              pathname: window.location.pathname,
              query: { ...router.query, page: 1, departement: newDepartmentValues }
            };

            delete params.query?.categoryName;

            router.push(params);
            setSearchPageLoading(true);
          }}
          id="input-region"
          getPopupContainer={(element) => element.parentNode}
        >
          {regions?.map((region, index) => {
            return (
              <Option key={index} value={region.regionCode}>
                {region.regionName}
              </Option>
            );
          })}
        </SelectElement>
        <SelectElement
          mode="multiple"
          placeholder="Département"
          style={{ width: "100%" }}
          onChange={(val) => {
            setDepartmentValues(val);
            const params = {
              pathname: window.location.pathname,
              query: { ...router.query, page: 1, departement: val }
            };

            delete params.query?.categoryName;

            router.push(params);
            setSearchPageLoading(true);
          }}
          value={departmentValues}
          id="input-region"
          getPopupContainer={(element) => element.parentNode}
          showArrow={true}
        >
          {regions.map((region, index) => {
            return (
              <OptGroup label={region.regionName} key={index}>
                {departments.map((department, index2) => {
                  if (department.regionCode == region.regionCode) {
                    //If departement is in selected region or if departement in in filterstate departements
                    return (
                      <Option key={index2} value={department.departmentCode}>
                        {department.departmentName}
                      </Option>
                    );
                  }
                })}
              </OptGroup>
            );
            //return(<option key={index} value={departments.regionCode}>{department.departmentName}</option>)
          })}
        </SelectElement>
        <DeleteFilters
          onClick={() => {
            setQueryValue("");
            setCategoryName(null);
            setDepartmentValues([]);
            setRegionValue(null);

            router.push({
              pathname: "/offres",
              query: { page: 1 }
            });
            setSearchPageLoading(true);
          }}
        >
          <FontAwesomeIcon icon={faTrashAlt} /> Effacer les filtres
        </DeleteFilters>
      </SearchFiltersElement>
    </SearchFiltersContainer>
  );
}

const mapState = (state) => {
  return {
    categories: state.category.categories
  };
};

const mapDis = {};

export default connect(mapState, mapDis)(SearchFilters);
