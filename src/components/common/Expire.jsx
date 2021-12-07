import React, { useEffect, useState } from "react";

const Expire = (props) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let timeout = setTimeout(() => {
      setVisible(false);
      props.callback();
    }, props.delay);
    return () => clearTimeout(timeout);
  }, [props.delay]);

  return visible ? <div>{props.children}</div> : <div />;
};

export default Expire;