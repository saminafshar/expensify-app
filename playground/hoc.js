// Higher Order Component (a component (hoc) that renders another component)

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is : {props.info}</p>
    </div>
)

const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {!props.isAuthenticated ? ( <WrappedComponent {...props} />) : (<p>You havae to login to see the info</p>)}
        </div>
    );
};

// const AdminInfo = withAdminWarning(info);

const AuthInfo = requireAuthentication(Info);

ReactDOM.render(<AuthInfo isAuthenticated={false} info="There are the details" />, document.getElementById('root'));