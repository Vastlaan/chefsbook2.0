import styled from "styled-components";
import {
    Heading1,
    Heading3,
    Heading6,
    ContainerNarrow,
    Text3,
} from "../../styles";

export default function TermsComponent() {
    return (
        <ContainerNarrow>
            <Terms>
                <Heading1>Terms and Conditions</Heading1>
                <Text3 wide>
                    Chefsbook builds technologies and services that enable
                    anyone who wants to manage their kitchen in one source
                    application, like ours. We provide tools to handle your
                    reservations, team schedules, preparation lists, store
                    recipes and much more. These Terms govern your use of
                    Chefsbook, except where we expressly state that separate
                    terms (and not these) apply. These products are provided to
                    you by Chefsbook.org. We don’t charge you to use Chefsbook
                    or the other products and services covered by these Terms.
                    We don’t sell your personal data to advertisers, and we
                    don’t share information that directly identifies you (such
                    as your name, email address or other contact information)
                    with advertisers unless you give us specific permission.
                </Text3>
                <Heading6>Who can use Chefsbook</Heading6>
                <Text3 wide>
                    Absolutely everyone above 13 year old is allowed to make an
                    account and use our products.
                </Text3>
                <Heading6>How you can use Chefsbook?</Heading6>
                <Text3 wide>
                    We want people to use Chefsbook to manage their daily tasks
                    related to work in the professional kitchen, restaurants and
                    hotels.
                </Text3>
                <Text3 wide>
                    You may not upload viruses or malicious code or do anything
                    that could disable, overburden, or impair the proper working
                    or appearance of our Products. You may not access or collect
                    data from our Products using automated means (without our
                    prior permission) or attempt to access data you do not have
                    permission to access. We can remove or block content that is
                    in breach of these provisions.
                </Text3>
                <Heading6>The permissions you give us</Heading6>
                <Text3 wide>
                    We need certain permissions from you to provide our
                    services: Permission to use content you create and share:
                    Some content that you share or upload, such as photos or
                    videos, may be protected by intellectual property laws. You
                    own the intellectual property rights (things like copyright
                    or trademarks) in any such content that you create and share
                    on Chefsbook. Nothing in these Terms takes away the rights
                    you have to your own content. You are free to share your
                    content with anyone else, wherever you want. However, to
                    provide our services we need you to give us some legal
                    permissions (known as a ‘license’) to use this content. This
                    is solely for the purposes of providing and improving our
                    Products and services as described in Section 1 above.
                    Specifically, when you share, post, or upload content that
                    is covered by intellectual property rights on or in
                    connection with our Products, you grant us a non-exclusive,
                    transferable, sub-licensable, royalty-free, and worldwide
                    license to host, use, distribute, modify, run, copy,
                    publicly perform or display, translate, and create
                    derivative works of your content (consistent with your
                    privacy and application settings). This means, for example,
                    that if you share a photo on Chefsbook, you give us
                    permission to store, copy, and share it with others (again,
                    consistent with your settings) such as service providers
                    that support our service.This license will end when your
                    content is deleted from our systems. You can delete content
                    individually or all at once by deleting your account.
                </Text3>
            </Terms>
        </ContainerNarrow>
    );
}

const Terms = styled.section`
    padding: 9.7rem 1.4rem;
    background-color: ${(p) => p.theme.black};

    p {
        margin: 2.7rem 0;
    }
`;
