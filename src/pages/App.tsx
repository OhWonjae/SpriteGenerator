import { Container } from '@/components/Container';
import { ContainerInner } from '@/components/ContainerInner';
import { FileUploader } from '@/components/FileUploader';
import { SpriteArea } from '@/components/SpriteArea';
import { OutputArea } from '@/components/OutputArea';

const App = () => {
  return (
    <Container title={'Sprite Generator'}>
      <ContainerInner>
        <FileUploader />
        <SpriteArea />
        <OutputArea />
      </ContainerInner>
    </Container>
  );
};

export default App;
