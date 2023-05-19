import { ReactNode, FC } from "react"
import { Layout } from 'antd';

interface Props {
    children: ReactNode
}

const PageLayout: FC<Props> = ({ children }) =>{
    return (
      <Layout>
        {children}
      </Layout>
    )
}