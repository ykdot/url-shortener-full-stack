import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import RedirectButton from './RedirectButton';
import { FC, ReactNode } from 'react';
import styles from './Form.module.css';

enum Version {
  ADMIN_LOGIN,
  LOGIN,
  SIGNUP,
}

interface ModelFormProps {
  version: Version;
  children: ReactNode;
}

const ModelForm: FC<ModelFormProps> = ({ version, children }) => {
  let shownTitle = '';
  let shownOtherOption = '';
  if (version === Version.ADMIN_LOGIN) {
    shownTitle = 'Admin Log In';
  } else if (version === Version.LOGIN) {
    shownTitle = 'Log In';
    shownOtherOption = 'Create An Account';
  } else {
    shownTitle = 'Sign Up';
    shownOtherOption = 'Log In';
  }

  return (
    <div className={styles.container}>
      <Card>
        <CardHeader>
          <CardTitle>{shownTitle}</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter>
          <RedirectButton label={shownOtherOption} version={version} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default ModelForm;
