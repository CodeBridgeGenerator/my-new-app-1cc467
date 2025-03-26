import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const ReportCollectionsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

    

    const onSave = async () => {
        let _data = {
            testName: _entity?.testName,
targetUrl: _entity?.targetUrl,
status: _entity?.status,
additionalNotes: _entity?.additionalNotes,
dateStarted: _entity?.dateStarted,
dateCompleted: _entity?.dateCompleted,
        };

        setLoading(true);
        try {
            
        const result = await client.service("reportCollections").patch(_entity._id, _data);
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info reportCollections updated successfully" });
        props.onEditResult(result);
        
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
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
        <Dialog header="Edit Report Collections" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="reportCollections-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="testName">TestName:</label>
                <InputText id="testName" className="w-full mb-3 p-inputtext-sm" value={_entity?.testName} onChange={(e) => setValByKey("testName", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["testName"]) && (
              <p className="m-0" key="error-testName">
                {error["testName"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="targetUrl">Target Url:</label>
                <InputText id="targetUrl" className="w-full mb-3 p-inputtext-sm" value={_entity?.targetUrl} onChange={(e) => setValByKey("targetUrl", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["targetUrl"]) && (
              <p className="m-0" key="error-targetUrl">
                {error["targetUrl"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="status">Status:</label>
                <InputText id="status" className="w-full mb-3 p-inputtext-sm" value={_entity?.status} onChange={(e) => setValByKey("status", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["status"]) && (
              <p className="m-0" key="error-status">
                {error["status"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="additionalNotes">Additional Notes:</label>
                <InputText id="additionalNotes" className="w-full mb-3 p-inputtext-sm" value={_entity?.additionalNotes} onChange={(e) => setValByKey("additionalNotes", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["additionalNotes"]) && (
              <p className="m-0" key="error-additionalNotes">
                {error["additionalNotes"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="dateStarted">Date Started:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["dateStarted"]) && (
              <p className="m-0" key="error-dateStarted">
                {error["dateStarted"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="dateCompleted">Date Completed:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["dateCompleted"]) && (
              <p className="m-0" key="error-dateCompleted">
                {error["dateCompleted"]}
              </p>
            )}
          </small>
            </div>
                <div className="col-12">&nbsp;</div>
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
