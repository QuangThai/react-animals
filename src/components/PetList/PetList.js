import React from "react";
import { Link } from "react-router-dom";
import usePets from "../../hooks/usePets";
import Header from "../Header/Header";
import Image from "../Image";
import Loading from "../Loading/Loading";
import LoadingLine from "../LoadingLine/LoadingLine";
import Pagination from "../Pagination/Pagination";
import "./style.css";

function PetList() {
  const { isLoading, isLoadFirst, page, handleChangePage, petList } = usePets(
    {}
  );

  return (
    <>
      <Header />
      <section id="repair">
        <div className="grid wide">
          <div className="row">
            {isLoading && isLoadFirst ? (
              <Loading />
            ) : (
              <>
                {Array.isArray(petList) && petList.length > 0 ? (
                  <>
                    {petList?.map((item) => (
                      <div className="col l-2-4 c-6 m-4" key={item?.id}>
                        <div className="product__item">
                          <div className="product__image product__image--service">
                            <Link to="/detail">
                              <Image
                                src={item?.primary_photo_cropped?.small}
                                alt={item?.name}
                              />
                            </Link>
                            <Link to="/detail">
                              <div className="mask-service">
                                <ul className="mask-service__list">
                                  <li className="mask-service__item">
                                    Size: {item?.size}
                                  </li>
                                  <li className="mask-service__item">
                                    Status: {item?.status}
                                  </li>
                                  <li className="mask-service__item">
                                    Type: {item?.type}
                                    {/* <span className="color__red">50.000₫</span> */}
                                  </li>
                                </ul>
                              </div>
                            </Link>
                          </div>
                          <div className="product__item-info product__item-info--padding">
                            <div className="product__item-left-right product__item-left-right--center">
                              <div className="product__item-left">
                                <h4 className="product__item-height">
                                  <Link
                                    to="/detail"
                                    className="product__name-title product__name-title--light"
                                  >
                                    Name: <b>{item?.name}</b>
                                  </Link>
                                </h4>
                                <span className="product__price">
                                  {item?.organization_id}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {isLoading && !isLoadFirst && (
                      <div
                        className="col l-12 m-12 c-12"
                        style={{ marginBottom: "10px" }}
                      >
                        <LoadingLine />
                      </div>
                    )}

                    <Pagination
                      currentPage={page?.current_page}
                      totalPage={page?.total_pages}
                      onChangePage={handleChangePage}
                    />
                  </>
                ) : (
                  <div className="col l-12 m-12 c-12">
                    Không tồn tại danh sách pets
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default PetList;
