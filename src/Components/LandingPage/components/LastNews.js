import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom'
import "../css/last news.css";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import people from "../images/people.jpg";
import people1 from "../images/people 1.jpg";
import people2 from "../images/people2.jpg";
import axios from 'axios';

function LastNews() {
  const history = useHistory()

  const [blog, setBlog] = useState([]);
  const [supp, setsupp] = useState([]);
  useEffect(() => {
    const { data: response } = axios.get(`https://api.woofics.com/api/blog`)
      .then((response) => {
        if (response) {
          setBlog(response.data)
        }
      }, (Error) => {
        console.log(Error);
      });


    const { data: respons } = axios.get(`https://api.woofics.com/api/data_of_interest`)
      .then((respons) => {
        if (respons) {
          console.log(respons.data)
          setsupp(respons.data[0])
        }
      }, (Error) => {
        console.log(Error);
      });

  }, [])



  return (
    <>
      <div className="container text-center mx-auto">
        <div class="woofic_lastnewner">
          <div className="row text-center">
            <div className="col-sm-12 col-md-12">
              <div class="woofic_lastnews_header">
                <div class="woofic_lastnews_heading">DATA OF INTEREST</div>
                <div class="woofic_lastnews_hline"></div>
              </div>
            </div>
            <div class="row mx-auto ">
              <div class="col-sm-12 col-md-4 mx-auto text-center">
                <div className="border px-5 shadow rounded py-5">
                  {/* <div class="woofic_lastnews_content_heading">{supp.leds_sold ? supp.leds_sold : 0}</div> */}
                  <div class="woofic_lastnews_content_description">

                    METERS 2 SOLD   <br />
                    <br />
                  </div>
                </div>
              </div>

              {/* SECOND BOX */}

              <div class="col-sm-12 col-md-4 mx-auto text-center">
                <div className="border px-5 shadow rounded py-5">
                  {/* <div class="woofic_lastnews_content"> */}
                  {/* <div class="woofic_lastnews_content_heading woofic_second_heading">
                    {supp.number_of_budgets ? supp.number_of_budgets : 0}
                  </div> */}
                  <div class="woofic_lastnews_content_description">
                    NUMBER OF BUDGETS
                    <br />
                    <br />
                  </div>
                  {/* </div> */}
                </div>
              </div>

              {/* THIRD BOX  */}

              <div class="col-sm-12 col-md-4 mx-auto text-center">
                <div className="border px-5 shadow rounded py-5">
                  {/* <div class="woofic_lastnews_content"> */}
                  {/* <div class="woofic_lastnews_content_heading woofic_third_heading">
                    {supp.active_suppliers?supp.active_suppliers:0}
                  </div> */}
                  <div class="woofic_lastnews_content_description">
                    NUMBER OF ACTIVE SUPPLIERS
                  </div>
                  {/* </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>



        <div className="container">
          <div class="row">
            <div class="col-sm-12">
              <div class="woofic_lastnews_below_header">
                {/* <div class="woofic_visiual_left"> */}
                <div class="woofic_lastnews_heading text-center">
                  Latest News
                  <div class="woofic_lastnews_sub-heading">
                    Start today for great future
                  </div>
                </div>
                <div class="woofic_lastnews_hline"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="woofic_lastnews_cards_container" onClick={() => history.push("/allblog")}>
          <div class="woofic_lastnews_card container ">
            <div className="row ">
              {blog.slice(0, 3).map((val, id) => {
                return (
                  <> <div className="col-sm-12 col-md-4 text-center">
                    <div class="woofic_last-news_cards">
                      <img src={val.image} />
                      <div class="woofic_lastnews_card-heading text-center">
                        {(val.author).slice(0, 40)}
                      </div>
                      <div class="woofic_lastnews_card-subheading text-center">
                        {(val.article).slice(0, 180) + '...'}
                      </div>
                    </div>
                  </div>
                  </>)
              })}

            </div>
          </div>
        </div>
      </div>




      <div className="container text-center mx-auto mt-lg-5">
        <div className="row mx-auto">
          <div className="col-sm-12 col-md-12">
            <div class="woofic_lastnews_header">
              <div class="woofic_lastnews_heading">FREQUENTLY ASKED QUESTION</div>
              <div class="woofic_lastnews_hline"></div>
            </div>
          </div>
          <div className="col-md-10 mx-auto">
            <div class="accordion" id="accordionExample">
              <div class="card">
                <div class="card-header" id="headingOne">
                  <h2 class="mb-0">
                    <button
                      class="btn btn-link btn-block text-left collapsed"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseOne"
                      aria-expanded="false"
                      aria-controls="collapseOne"
                    >
                      How does Woofic work?
                    </button>
                  </h2>
                </div>

                <div
                  id="collapseOne"
                  class="collapse"
                  aria-labelledby="headingOne"
                  data-parent="#accordionExample"
                >
                  <div class="card-body">
                    Woofic sends its collaborators (suppliers) the questionnaire
                    filled out by the client, within a maximum period of 48
                    hours the suppliers have to answer questions and present a
                    binding offer.
                  </div>
                </div>
              </div>
              <div class="card">
                <div class="card-header" id="headingTwo">
                  <h2 class="mb-0">
                    <button
                      class="btn btn-link btn-block text-left collapsed"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      Why do I have to register?
                    </button>
                  </h2>
                </div>
                <div
                  id="collapseTwo"
                  class="collapse"
                  aria-labelledby="headingTwo"
                  data-parent="#accordionExample"
                >
                  <div class="card-body">
                    Woofic is a comprehensive platform, in which you will receive and manage offers, perform
                    supplier ratings and many more advantages, that is why it is necessary to register, to be
                    able to access your personal administration panel.

                  </div>
                </div>
              </div>
              {/* <div class="card">
                <div class="card-header" id="headingThree">
                  <h2 class="mb-0">
                    <button
                      class="btn btn-link btn-block text-left collapsed"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      Why use Woofic instead of contracting directly with the
                      provider?
                    </button>
                  </h2>
                </div>
                <div
                  id="collapseThree"
                  class="collapse"
                  aria-labelledby="headingThree"
                  data-parent="#accordionExample"
                >
                  <div class="card-body">
                    Make secure payments through the platform. The conditions
                    are set by you, penalties for delays, blocking the last
                    payment until it has been installed or delivered. Woofic has
                    insurance in case the supplier does not deliver the screen
                    or the delivery is not in optimal condition. Many more
                    advantages HERE.
                  </div>
                </div>
              </div> */}
              <div class="card">
                <div class="card-header" id="headingFour">
                  <h2 class="mb-0">
                    <button
                      class="btn btn-link btn-block text-left collapsed"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseFour"
                      aria-expanded="false"
                      aria-controls="collapseFour"
                    >
                      Does Woofic favor any company?
                    </button>
                  </h2>
                </div>
                <div
                  id="collapseFour"
                  class="collapse"
                  aria-labelledby="headingFour"
                  data-parent="#accordionExample"
                >
                  <div class="card-body">
                    No. Woofic.com is a totally independent portal, we only put
                    customers in contact with suppliers and each supplier makes
                    its personalized offer directly to the final customer, the
                    order in which the results are shown by default is by order
                    of arrival, the first quote is displayed at position 1 so
                    on.
                  </div>
                </div>
              </div>
              <div class="card">
                <div class="card-header" id="headingFive">
                  <h2 class="mb-0">
                    <button
                      class="btn btn-link btn-block text-left collapsed"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseFive"
                      aria-expanded="false"
                      aria-controls="collapseFive"
                    >
                      How does Woofic.com make money?
                    </button>
                  </h2>
                </div>
                <div
                  id="collapseFive"
                  class="collapse"
                  aria-labelledby="headingFive"
                  data-parent="#accordionExample"
                >
                  <div class="card-body">
                    Our service is completely free. The offers that you will
                    find from the different providers in Woofic are the same
                    that you will find in each company. There are no
                    commissions, no price increases. Every time a project,
                    product or service is contracted, we charge a commission to
                    the provider, never to the user.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
export default LastNews;
