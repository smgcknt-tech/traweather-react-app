import React, { useContext, useEffect, useMemo, useState } from "react";
import { AppContext, AppActions } from "../AppStore";
import { helper } from "../utils/helper";
import "../../src/styles/pages/PlanPage.scss";
import StoryTable from "../components/StoryTable";
import Loading from "../components/common/Loading";
import Message from "../components/common/Message";
import Reason from "../components/Reason";
import Strategy from "../components/Strategy";
import StoryChart from "../components/StoryChart";
import SearchBar from "../components/SearchBar";
import Prediction from "../components/Prediction";
import PlanAddForm from "../components/forms/PlanAddForm";

export default function PlanPage() {
  const { state, dispatch } = useContext(AppContext);
  const { user, prediction, allStocks, loading, error, selectedStock, planData } = state;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (user.id) {
      const fetchPlanPageData = async () => {
        const fetchedPlan = await helper.fetchData(`/api/plan`, dispatch, AppActions, {
          user_id: user.id,
        });
        if (fetchedPlan?.length > 0) {
          dispatch({ type: AppActions.SET_PLAN, payload: fetchedPlan });
          dispatch({ type: AppActions.SET_SELECTED_STOCK, payload: fetchedPlan[0] });
        }
        const fetchedPrediction = await helper.fetchData(`/api/prediction`, dispatch, AppActions, {
          user_id: user.id,
          date: helper.time().today,
        });
        if (fetchedPrediction) dispatch({ type: AppActions.SET_PREDICTION, payload: fetchedPrediction });
      };
      fetchPlanPageData();
    }
  }, [user.id]); // eslint-disable-line

  const indicatorsData = useMemo(() => {
    if (allStocks && selectedStock) return allStocks.find((stock) => selectedStock.code === Number(stock.code));
  }, [selectedStock, allStocks, planData]); // eslint-disable-line

  useEffect(() => {
    if (selectedStock) dispatch({ type: AppActions.SET_INDICATORS, payload: indicatorsData });
  }, [indicatorsData, selectedStock]); // eslint-disable-line

  if (loading) return <Loading />;
  if (error) return <Message variant="error">{error}</Message>;
  return (
    <div className="plan_page">
      <ul className="header_menu">
        <li onClick={() => {setOpen("add");}}>
          <i className="fas fa-edit" />銘柄追加
        </li>
      </ul>
      {planData?.length === 0 && <Message>プランデータがありません。まずはプランデータを作成しましょう。</Message>}
      <div className="main">
        <SearchBar />
        <div className="dashboard">
          <div className="dashboard_row1">
            <div className="left_col">
              {(open === "add" || planData.length === 0) && <PlanAddForm setOpen={setOpen} />}
              {planData.length > 0 && <StoryTable />}
              <StoryChart />
            </div>
            <div className="right_col">
              <Reason />
              <Strategy />
            </div>
          </div>
          <div className="dashboard_row2">{prediction && <Prediction />}</div>
        </div>
      </div>
    </div>
  );
}
