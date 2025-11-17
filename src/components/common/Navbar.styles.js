import styled from 'styled-components';

export const Nav = styled.nav`
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  border-bottom: 1px solid rgba(0, 129, 167, 0.1);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 9999;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease;
  transform: ${props => props.$isVisible ? 'translateY(0)' : 'translateY(-100%)'};
`;

export const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md) 0;
`;

export const Brand = styled.div`
  display: flex;
  align-items: center;
`;

export const BrandLink = styled.a`
  text-decoration: none;
`;

export const BrandText = styled.h2`
  margin: 0;
  color: var(--primary-color);
  font-size: var(--text-2xl);
  font-weight: 700;
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
`;

export const NavLink = styled.a`
  color: var(--text-primary);
  text-decoration: none;
  font-weight: 500;
  transition: color var(--transition-fast);
  padding: var(--spacing-sm);
  border-radius: var(--radius-md);

  &:hover {
    color: var(--primary-color);
  }
`;

export const UserMenu = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
`;

export const ProfileLink = styled.a`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  text-decoration: none;
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-full);
  background-color: var(--bg-secondary);
  transition: all var(--transition-fast);
  border: 2px solid transparent;

  &:hover {
    border-color: var(--primary-color);
    background-color: rgba(0, 175, 185, 0.05);
  }
`;

export const AvatarCircle = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 2px solid var(--primary-color);
`;

export const Avatar = styled.span`
  font-size: 22px;
  line-height: 1;
  display: block;
`;

export const UserName = styled.span`
  color: var(--text-primary);
  font-weight: 600;
  font-size: var(--text-sm);
`;
