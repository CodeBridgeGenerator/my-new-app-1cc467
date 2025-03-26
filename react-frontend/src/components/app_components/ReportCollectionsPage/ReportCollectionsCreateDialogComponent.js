import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
      if (Object.hasOwnProperty.call(errorObj.errors, key)) {
        const element = errorObj.errors[key];
        if (element?.message) {
          errMsg[key] = element.message;
        }
      }
    }
    return errMsg.length ? errMsg : errorObj.message ? { error : errorObj.message} : {};
};

const ReportCollectionsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [], setError);
        }
        set_entity({...init});
        setError({});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.testName)) {
                error["testName"] = `TestName field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.targetUrl)) {
                error["targetUrl"] = `Target Url field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.status)) {
                error["status"] = `Status field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.additionalNotes)) {
                error["additionalNotes"] = `Additional Notes field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            testName: _entity?.testName,targetUrl: _entity?.targetUrl,status: _entity?.status,additionalNotes: _entity?.additionalNotes,dateStarted: _entity?.dateStarted,dateCompleted: _entity?.dateCompleted,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("reportCollections").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Report Collections created successfully" });
        props.onCreateResult(result);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Report Collections" });
        }
        setLoading(false);
    };

    

    

    

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    

    return (
        <Dialog header="Create Report Collections" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="reportCollections-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="testName">TestName:</label>
                <InputText id="testName" className="w-full mb-3 p-inputtext-sm" value={_entity?.testName} onChange={(e) => setValByKey("testName", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["testName"]) ? (
              <p className="m-0" key="error-testName">
                {error["testName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="targetUrl">Target Url:</label>
                <InputText id="targetUrl" className="w-full mb-3 p-inputtext-sm" value={_entity?.targetUrl} onChange={(e) => setValByKey("targetUrl", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["targetUrl"]) ? (
              <p className="m-0" key="error-targetUrl">
                {error["targetUrl"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="status">Status:</label>
                <InputText id="status" className="w-full mb-3 p-inputtext-sm" value={_entity?.status} onChange={(e) => setValByKey("status", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["status"]) ? (
              <p className="m-0" key="error-status">
                {error["status"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="additionalNotes">Additional Notes:</label>
                <InputText id="additionalNotes" className="w-full mb-3 p-inputtext-sm" value={_entity?.additionalNotes} onChange={(e) => setValByKey("additionalNotes", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["additionalNotes"]) ? (
              <p className="m-0" key="error-additionalNotes">
                {error["additionalNotes"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="dateStarted">Date Started:</label>
                <Calendar id="dateStarted"  value={_entity?.dateStarted ? new Date(_entity?.dateStarted) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("dateStarted", new Date(e.target.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["dateStarted"]) ? (
              <p className="m-0" key="error-dateStarted">
                {error["dateStarted"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="dateCompleted">Date Completed:</label>
                <Calendar id="dateCompleted"  value={_entity?.dateCompleted ? new Date(_entity?.dateCompleted) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("dateCompleted", new Date(e.target.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["dateCompleted"]) ? (
              <p className="m-0" key="error-dateCompleted">
                {error["dateCompleted"]}
              </p>
            ) : null}
          </small>
            </div>
            <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(ReportCollectionsCreateDialogComponent);
